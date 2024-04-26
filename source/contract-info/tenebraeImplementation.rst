###########################
Tenebraeの実装
###########################

概要図

   .. figure:: ../img/tenebrae/tenebrae.png

運営者（RECIPE所有者）
====================================================

スキルコントラクト
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ITenebraeSkillインターフェースを実装したコントラクトを作成(ITenebraeSkill.sol)::

        @notice skillを発動する
        @param tenebraeInfo 対象tenebrae
        @return 発動効果
        function activate (TenebraeTokenInfo calldata tenebraeInfo) external returns (ActivationEffect memory);

TenebraeTokenInfo[]::

        struct TenebraeTokenInfo {
                uint256 id;                 // Tenebrae ID
                uint256 attachedTo;         // 装着先 ID
                uint16  activationCount;    // SKILL発動回数
                uint8   attachedTokenType;  // 装着先種別（TenebraeConst.TOKEN_TYPE_XXXX）
                uint8   attachedSlot;       // 装着スロット番号
                address skill;              // スキル
                uint256        skillSet;    // スキルセット（スキル内の分類）
        }

ActivationEffect[]::

        struct ActivationEffect {
                int16[6] abilityValues; // 装着先の能力値の増減値
                int16[6] abilityRatios; // 装着先の能力地のの増減率
                bool[6]  resetAbility;  // true: 能力増減値をリセット
                bool     dismissal;     // true: 実行後にTenebraeは装着スロットから外す。false: スロットから外さない
                string   skillMetadata; // 発動結果として設定するメタデータ
        }

TenebraeConst::

        contract TenebraeConst {
            uint8 public constant TOKEN_TYPE_NONE = 0;
            uint8 public constant TOKEN_TYPE_SHARD = 1;
            uint8 public constant TOKEN_TYPE_ARCANA = 2;
            uint8 public constant TOKEN_TYPE_PERSONA = 3;
            uint8 public constant TOKEN_TYPE_EGG = 4;

            uint8 public constant EVENT_MINT = 0;
            uint8 public constant EVENT_ATTACH = 1;
            uint8 public constant EVENT_ACTIVATE = 2;
            uint8 public constant EVENT_VANISH = 3;
        }

スキルコントラクトの登録
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ITenebraeSkillインターフェースを実装したコントラクトを登録(RecipeController.sol)::

     @notice TenebraeSkillを登録する
     @param assesor //実装したコントラクトアドレス
     @param description //説明
     @return skillId
     function registerSkill(address skill,string calldata description) public override onlyRegisterer returns (uint256)

スキルコントラクトの参照
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ITenebraeSkillインターフェースを実装したコントラクトを参照(RecipeController.sol)::

     @param skillId
     @return RegisteredInfo
     function getSkill(uint256 skillId) public override view returns (RegisteredInfo memory)

複数用::

     @param offset
     @param limit
     @return RegisteredInfo
     function getSkills(uint256 offset,uint256 limit) public override view returns (RegisteredInfo[] memory)

登録されているskillの個数を取得::

     function getLastSkillId() public override view returns (uint256)

TenebraeConst::

     struct RegisteredInfo {
             uint256 id;
             address contractAddr;
             string  description;
     }

生成条件コントラクト
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ITenebraeMintAssesorインターフェースを実装したコントラクトを作成(ITenebraeMintAssesor.sol)::

        @notice Tenebraeの生成条件が合致するか否かを判定する。
        @param tokenType トークンのタイプ TenebraeConst.TOKEN_TYPE_XXXX
        @param ids 消費するトークンIDの配列
        @param amounts 消費するトークンの数量
        @return true: 指定条件でmint可能、false: 指定条件ではmintできない
        function asses(uint8 tokenType,uint256[] calldata ids,uint256[] calldata amounts) external view returns (bool);

生成条件コントラクトの登録
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ITenebraeMintAssesorインターフェースを実装したコントラクトを登録(RecipeController.sol)::

        @notice TenebraeMintAssesorを登録する
        @param assesor //実装したコントラクトアドレス
        @param description //説明
        @return assesorId
        function registerAssesor(address assesor,string calldata description) public override onlyRegisterer returns (uint256)

生成条件コントラクトの参照
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ITenebraeMintAssesorインターフェースを実装したコントラクトを参照(RecipeController.sol)::

     @param assesorId
     @return RegisteredInfo
     function getAssesor(uint256 assesorId) public override view returns (RegisteredInfo memory)

複数用::

     @param offset
     @param limit
     @return RegisteredInfo
     function getAssesors(uint256 offset,uint256 limit) public override view returns (RegisteredInfo[] memory)

登録されているskillの個数を取得::

     function getLastAssesorId() public override view returns (uint256)

RECIPE生成
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Recipeをmint(Recipe.sol)::

        @notice mint
        @param to 発行先のaddress
        @param skillId 付与するskillId
        @param assesorId 生成条件のId 
        @return 生成したTenebrae token のID
        function mint(address to,uint256 skillId,uint256 skillSet,uint256 assesorId) public onlyMinter returns (uint256)

TokenInfo::

        struct TokenInfo {
                uint256 id;        // RECIPE ID
                address assesor;   // TenebraeのMINT条件確認コントラクト
                address skill;     // スキル
                uint256 skillSet;  // スキル内の分類
        }

ARCANAトークン/PERSONAトークンの能力値の取得
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

能力値の増減の取得(TenebraeHost.sol)::

        @param hostType TenebraeConst.TOKEN_TYPE_XXXX
        @param hostId
        @return HostInfo
        function hostInformation(uint8 hostType,uint256 hostId) public view returns (HostInfo memory)

HostInfo::

        /// @notice 能力の増減の保持
        struct HostInfo {
                /// @notice ARCANA/PERSONA
                uint8 hostType;
                /// @notice tokenId of ARCANA/PERSONA
                uint256 hostId;
                /// @notice slot for attach TENEBRAE
                uint256[] slot;
                /// @notice metadata of the result of activation of TENEBRAE
                string[] activatedMetadata;
                /// @notice increments of attribute values
                int32[6] incrementValues;
                /// @notice multiplier of attribute values (1/100000)
                int32[6] incrementRatios;
        }


Arcanaの能力値（原始値＋補正値）を取得(TenebraeHost.sol)::

        @notice Arcanaの能力値（原始値＋補正値）を取得する。
        @param tokenId ArcanaのtokenId
        @return original Arcanaの原始能力値
        @return currentAbilities 補正済みの能力値
        function getArcanaParameters(uint256 tokenId) external view returns (IArcana.Parameters memory original,uint16[] memory currentAbilities)

Personaの能力値（原始値＋補正値）を取得(TenebraeHost.sol)::

        @notice Personaの能力値（原始値＋補正値）を取得する。
        @param tokenId PersonaのtokenId
        @return original Personaの原始能力値
        @return currentAbilities 補正済みの能力値
        function getPersonaParameters(uint256 tokenId) external view returns (uint16[] memory original,uint16[] memory currentAbilities)

装着済みTENEBRAEの一覧取得
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

装着済みのTENEBRAEのリストを取得(TenebraeHost.sol)::

        @notice ARCANA/PERSONAに装着済みのTENEBRAEのリストを取得する
        @param hostType 対象ARCANA/PERSONA別 TenebraeConst.TOKEN_TYPE_XXXX
        @param hostId 対象ARCANA/PERSONAのID
        @return 装着スロットの装着状態（0は未装着を表す)
        function getAttached(uint8 hostType,uint256 hostId) public view validType(hostType) returns (uint256[] memory) 

履歴の取得
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
履歴を取得(TenebraeHost.sol)::

        @param tenebraeId テネブラエID
        @return history
        @dev 履歴の取得
        function getHistory(uint256 tenebraeId) public override view returns(History[] memory) 

TokenInfo::

        struct History {
                uint8   eventType;      // TenebraeConst.EVENT_XXX
                uint64  timestamp;
                address triggeredBy;    // 実行者アドレス msg.sender
        }

能力値変更functionへのアクセス権の付与・剥奪
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

アクセス権の付与(TenebraeGameIF .sol)::

        function grantAccess(address _addr) public onlyAuthority

アクセス権の剥奪(TenebraeGameIF .sol)::

        function revokeAccess(address _addr) public onlyAuthority

業者
============================================

TENEBRAEトークン生成
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

TENEBRAEのmint(Recipe.sol)::

        @param recipeId
        @param mintTo
        @param shardIds // 消費するshardのid
        @param amounts  // 消費するshardの量
        function produceByShard(uint256 recipeId,address mintTo,uint256[] calldata shardIds,uint256[] calldata amounts) public onlyOwner validToken(recipeId) returns (uint256)

コンシューマ（TENEBRAEトークン所有者）
============================================

TENEBRAEトークンの装着
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ARCANA/PERSONAに装着(TenebraeHost.sol)::

        @notice TENEBRAEをARCANA/PERSONAに装着する
        @param hostType 装着先ARCANA/PERSONA別 TenebraeConst.TOKEN_TYPE_XXXX
        @param hostId 装着先ARCANA/PERSONAのID
        @param tenebraeId 装着先
        @return 装着したスロットインデックス（0オリジン)
        @dev 空きスロットがない場合はリバートメッセージ E10 でリバーとする
        function attach(uint8 hostType,uint256 hostId,uint256 tenebraeId) public override returns (uint256)

スキルの発動
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

スキルの発動(TenebraeToken.sol)::

        @notice active
        @param tenebraeId 対象TENEBRAE
        function activate(uint256 tenebraeId) 

パブリッシャー
=====================================

TENEBRAEの発動により設定されたメタデータ一覧の取得
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

SKILLの発動データのリストを取得(TenebraeHost.sol)::

        @notice SKILLの発動データのリストを取得する。
        @param hostType 対象ARCANA/PERSONA別 TenebraeConst.TOKEN_TYPE_XXXX
        @param hostId 対象ARCANA/PERSONAのID
        @return スキル発動データのリスト
        function getActivatedSkills(uint8 hostType,uint256 hostId) external view validType(hostType) returns (ActivatedSkillInfo[] memory) 

スロット指定(TenebraeHost.sol)::

        @notice SKILLの発動データを取得する
        @param hostType 対象ARCANA/PERSONA別 TenebraeConst.TOKEN_TYPE_XXXX
        @param hostId 対象ARCANA/PERSONAのID
        @param slotIdx 対象装着スロットのインデックス
        @return スキル発動データ
        function getActivatedSkill(uint8 hostType,uint256 hostId,uint8 slotIdx) external view validType(hostType) returns (ActivatedSkillInfo memory)

ActivatedSkillInfo::

        /// @notice 発動したスキルのメタデータ情報
        struct ActivatedSkillInfo {
                /// @notice 装着スロットインデックス
                uint8 slotIdx;
                /// @notice 発動したSKILLのメタデータ
                string metadata;
        }

TENEBRAEの発動により設定されたメタデータの消費
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

SKILLの発動データを消費(TenebraeHost.sol)::

        @notice SKILLの発動データを消費（削除-クリア）する。
        @param hostType 対象ARCANA/PERSONA別
        @param hostId 対象ARCANA/PERSONAのID
        @param slotIdx 対象装着スロットのインデックス
        function consumeActivatedData(uint8 hostType,uint256 hostId,uint8 slotIdx) public validType(hostType)

ARCANAトークン/PERSONAトークンの能力値の取得
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

運営者（RECIPE所有者）を参照

ゲームの結果としての能力値の増減値の設定
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

運営者（RECIPE所有者）を参照

ARCANA/PERSONAの能力値の加減値・率を更新（権限付与が必要）
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

SKILLの発動データを消費(TenebraeHost.sol)::

        @param hostType 対象ARCANA/PERSONA別
        @param hostId 対象ARCANA/PERSONAのID
        @param values HostInfoのincrementValuesに設定する値
        @param ratios HostInfoのincrementRatiosに設定する値
        function updateAbilities(uint8 hostType,uint256 hostId,int16[6] calldata values,int16[6] calldata ratios) public onlyGranted
