###########################
PERSONAの生成・配布
###########################

概要図
============================================

.. image:: ../img/PERSONA/personaMint.png

--------------------------------------------------------------------------------------------------------------------------------

PERSONAの生成
============================================
| PERSONAの生成にはANIMAを消費する。初期能力値はmint時に投入するANIMAの量を基に決定される。投入量が多いほど、能力値の合計が高くなる。
| 投入量は自身が所属するKnightの席番に設定されている範囲内で設定が可能。
| FORCE以外の能力値の分配割合は、パブリッシャーで決定できる。FORCEについては固定割合となる。

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


吸収（Absorb）
============================================
`こちら <../game-development/persona-absorb.html>`__ を参照

--------------------------------------------------------------------------------------------------------------------------------


PERSONA コントラクト
=============================================================

■パブリッシャー向けfunction

PERSONAの生成(Persona.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

         @param to PERSONAの生成先アドレス
         @param fromId mintする PersonaのID部の開始値。生成するPersonaのIDは以下の構造を持つ256bitデータ
         生成するpersona token の token ID は persona id in contents 部が fromId からfromId + numTokens - 1までの値を持つ
         全てのIDは未使用である必要がある。
          255                     32 31         16 15          0
         +--------------------------+-------------+-------------+
         |  persona id in contents  | square key  | contents id |
         +--------------------------+-------------+-------------+
         @param numTokens mintするPersona token の数
         @param conditions MintCondition
         @return 生成したPersona token のIDの配列
         function mintBatch(address to,uint256 fromId,uint256 numTokens,MintCondition[] calldata conditions) public onlyMinter returns (uint256[] memory tokens)

PERSONAの生成(配列なしversion)(Persona.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

         function mintBatchUnified(address to,uint256 fromId,uint256 numTokens,MintCondition calldata condition) public returns (uint256[] memory tokens)

.. admonition:: fromIdの求め方

  mintに使用するfromIdはfindAvailableIdsで求めることができる。下部に記載の「使用可能なPERSONA IDを検索するfunction」を参照。


MintCondition
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

         @param animaAmounts 各Personaのmintに投入するAnima token の量。要素数はnumTokensであること。
         この配列の合計数のanimaを、本function呼び出し前に Personaコントラクトに対してapproveしていなければならない。
         square keyが紐づくKnightのseat毎に設定されているanimaの最低・最高投入量の範囲内でなければならない。
         @param weightsList 生成する各Personaの能力値の割当Weight。要素数はnumTokensであること。各要素は以下の構造を持つ
         weights[n][0] n番目に生成するpersonaのABSの重み
         weights[n][1] n番目に生成するpersonaのDFTの重み
         weights[n][2] n番目に生成するpersonaのMNDの重み
         weights[n][3] n番目に生成するpersonaのINTの重み
         weights[n][4] n番目に生成するpersonaのEXPの重み

         struct MintCondition {
             uint256  animaAmounts; // 投入animaの量
             uint64   elements;     // エレメントを指定（0~6）
             uint8[5] weights;      // 生成する各Personaの能力値の割当Weight
             string   metadata;     // 設定するmetadata
         }

| ※エレメントは `こちら <../contract-info/attributes.html>`__ のエレメント抽選確率表を参照。
| 　ARCANA生成では抽選だがPERSONAの場合指定できる。

PERSONAの持つ属性値について::

        パラメーターとして以下の6つの属性値を持つ。
        属性値はAbsorbにより増減が発生する。
        また、Drawchain実行の条件として使用される。

            FOR (Force/エネルギー)
            ABS (Abyss/深淵)
            DFT (Determination/意思)
            MND (Mind/精神)
            INT (Intelligence/知識)
            EXP (Experience/経験値)

metadataについて::

         以下の手順で設定する。
         ・設定したい画像をIPFSにアップロードし、hashを取得。
         ・jsonファイルをIPFSにアップロードし、hashを取得。
         ・上記で取得したhashをmetadataに設定する。
         jsonファイルのフォーマットは以下となる。
         
         {
             "name": "persona", // PRSONAの名前
             "creator": "user", // 作成者の名前
             "image": "QmYCQ3oX4M8snuesMah8cCfH5z9wuDWZm9rxLmZT5z1BzH", // 画像をアップロードしたhash
             "description": "" // 説明
         }

メタデータ（変更可能）を設定する(Persona.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

         @param tokenId PersonaTokenID
         @param metadata 設定するmetadata
         function setMutableMetadata(uint256 tokenId,string memory metadata)

メタデータを取得する(Persona.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

         @param tokenId PersonaTokenID
         @return immutableMetadata,mutableMetadata
         function getMetadata(uint256 tokenId) public view returns(string memory immutableMetadata,string memory mutableMetadata)

使用可能なPERSONA IDを検索する(Persona.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

         @param _fromId 開始tokenId
         @param _untilId 終了tokenId
         @param numTokens 個数
         @return uint256  0 : 検索範囲内に条件を満たすIDは存在しない。それ以外：利用可能な先頭のID。
         function findAvailableIds(uint256 _fromId,uint256 _untilId,uint256 numTokens) external view returns (uint256)

使用方法sample ::

         // 検索開始値
         const fromId = squareKey.shln(16);
         // 検索終了値
         const untilId = fromId.or(new BN('ffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000',16));
         // 使用可能なPERSONA IDを検索
         const targetId = await persona.findAvailableIds(fromId,untilId,検索したい個数);
         // 検索したIDをmintBatchに使用
         await persona.mintBatch(mint先のaddress, targetId, mintするPersona tokenの数, [conditions]);


所有者以外のアドレスに特定のNFTの転送を承認する（署名あり）(Persona.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

         @param to 転送先のaddress
         @param tokenId PERSONA ID
         @param nonce 署名生成手順参照
         @param sig 署名生成手順参照
         function approve(address to,uint256 tokenId,uint256 nonce,bytes memory sig) public validToken(tokenId)

NFTの転送（署名あり）(Persona.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

         @param from 転送元のaddress
         @param to 転送先のaddress
         @param tokenId PERSONA ID
         @param nonce 署名生成手順参照
         @param sig 署名生成手順参照
         function transferFrom(address from,address to,uint256 tokenId,uint256 nonce,bytes memory sig) public validToken(tokenId)

所有者以外のアドレスに特定のNFTの転送を承認する(Persona.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

         @param to 転送先のaddress
         @param tokenId PERSONA ID
         function approve(address to,uint256 tokenId) public validToken(tokenId)

NFTの転送(Persona.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

         @param from 転送元のaddress
         @param to 転送先のaddress
         @param tokenId PERSONA ID
         function transferFrom(address from,address to,uint256 tokenId) public validToken(tokenId)

