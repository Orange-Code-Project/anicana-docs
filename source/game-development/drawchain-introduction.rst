###########################
DrawChainの導入
###########################

概要図
============================================

.. image:: ../img/PERSONA/DrawChain.png

--------------------------------------------------------------------------------------------------------------------------------

Drawchainの設定
============================================
| DrawChainを実行する際の条件を設定できる。
| IDrawChainAuthorizerインターフェースを継承したコントラクトを登録することで設定が可能。

■パブリッシャー向けfunction

①DrawChainを実行する際の条件を設定するcontractを作成
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

IDrawChainAuthorizerインターフェースを実装したコントラクトを作成(IDrawChainAuthorizer.sol)::

        @param drawChainId DrawChain ID
        @param presetId プリセット番号（実装コントラクト内で自由に定義する）
        @param personaId PERSONA Id
        function authorizeDraw (uint256 drawChainId,uint256 presetId,uint256 personaId) external view returns (bool);

インターフェースファイルは環境情報を参照。


②DrawChainを登録する。
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
| 上記で作成したコントラクトをAuthorizerInfoに設定する。
| AuthorizerInfo[]に作成したコントラクトのアドレス、presetIdを設定する。
| presetIdの使用方法は実装コントラクト内で自由に定義することができる。

DrawChainを登録するfunction(Drawchain.sol)::

        @param squareKey DrawChainに紐づくSquareKey
        @param _authorizers authorizerのリスト
        @return DrawChain ID
        function newDrawChain(uint256 squareKey,AuthorizerInfo[] calldata _authorizers) public returns(uint256)

AuthorizerInfo[]::

        struct AuthorizerInfo {
            @notice IDrawChainAuthorizer コントラクトアドレス
            address authorizer;
            @notice IDrawChainAuthorizer コントラクトのプリセットID
            uint256 presetId;
        }


アクティブ、非アクティブの設定
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| 初期登録時はtrue: draw可能が設定されている。
| DrawChain作成者はdrawの実行を制御可能であり、アクティブ＝true: draw可能、非アクティブ=false: draw不可を変更できる。

DrawChainのアクティブ、非アクティブの設定を行うfunction(Drawchain.sol)::

        @param drawChainId DrawChain ID
        @param active true: draw可能、false: draw不可能
        function deactivateDrawChain(uint256 drawChainId,bool active) public;

--------------------------------------------------------------------------------------------------------------------------------

その他Drawchainに関するfunction
============================================

指定したPERSONAがdraw可能なDrawChain IDの配列を返す(Drawchain.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

        @param from 検査対象DrawChain 開始ID (inclusive)
        @param until 検査対象DrawChain 終了ID (inclusive)
        @param limit 成功するDrawChainがlimitに達したら検索を終了する（返す配列の最大要素数）
        @param personaId DrawChainを引くPERSONA ID
        @return drawが成功する DrawChainのID配列
        function availables(uint256 from,uint256 until,uint256 limit,uint256 personaId) public view returns(uint256[] memory) 

.. admonition:: 指定範囲について

  availables()は広い範囲を検索しようとするとgas不足になる可能性があるので注意してください。

DrawChain情報を取得する(Drawchain.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

        @param fromId 先頭のDrwaChain ID
        @param count 取得するDrawChain情報数
        @return DrawChainInfoの配列
        function getDrawChain(uint256 fromId,uint256 count) public view returns(DrawChainInfo[] memory)

DrawChainInfo
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

        struct DrawChainInfo {
            uint256 id;
            uint32 squareKey;
            uint8   active;
            uint8   pad1;
            uint16  pad2;
            uint64  pad3;
            uint128 pad4;
        }

DrawChain毎のdraw数（履歴数）を返す(Drawchain.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

        @param drawChainId DrawChain ID
        @return draw数（履歴数）
        function drawHistoryCountByDrawChain(uint256 drawChainId) public view returns(uint256)

DrawChain毎のdraw履歴を返す（batch version)(Drawchain.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

        @param fromIdx 開始index (inclusive)
        @param count 取得するdraw履歴数
        @return draw履歴配列
        function drawHistoryByDrawChain(uint256 drawChainId,uint256 fromIdx,uint256 count) public view returns(History[] memory)

PERSONA毎のdraw数（履歴数）を返す(Drawchain.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

        @param personaId PERSONA Id
        @return draw数（履歴数）
        function drawHistoryCountByPersona(uint256 personaId) public view returns(uint256)

PERSONA毎のdraw履歴を返す（batch version)(Drawchain.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

        @param personaId PERSONA Id
        @param fromIdx 開始index (inclusive)
        @param count 取得するdraw履歴数
        @return draw履歴配列
        function drawHistoryByPersona(uint256 personaId,uint256 fromIdx,uint256 count) public view returns(History[] memory)

History
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

        struct History {
            @notice 自身のhistory ID draw()で返す値と同じ
            uint256 id;
            @notice drwaChain Id
            uint256 drawChainId;
            @notice PERSONA Id
            uint256 personaId;
            @notice owner of PERSONA at the time of draw
            address personaOwner;
            @notice drawしたタイムスタンプ
            uint128 drawnOn;
            @notice deliver(景品を配布した)したタイムスタンプ
            uint128 deliveredOn;
        }

DrawChain+PERSONA毎のdraw数（履歴数）を返す(Drawchain.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

        @param drawChainId DrawChain ID
        @param personaId PERSONA Id
        @return draw数（履歴数）
        function drawHistoryCountByDrawChainAndPersona(uint256 drawChainId,uint256 personaId) public view returns(uint256)

DrawChain+PERSONA毎のdraw履歴を返す（batch version)(Drawchain.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

        @param drawChainId DrawChain ID
        @param personaId PERSONA Id
        @param fromIdx 開始index (inclusive)
        @param count 取得するdraw履歴数
        @return draw履歴配列
        function drawHistoryByDrawDrawChainAndPersona(uint256 drawChainId,uint256 personaId,uint256 fromIdx,uint256 count) public view returns(History[] memory)

PERSONA owner毎のdraw数（履歴数）を返す(Drawchain.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

::

        @param personaOwner Persona owner アドレス
        @return draw数（履歴数）
        function drawHistoryCountByPersonaOwner (address personaOwner) public view returns(uint256)

PERSONA owner毎のdraw履歴を返す（batch version)(Drawchain.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

::

        @param personaOwner Persona owner アドレス
        @param fromIdx 開始index (inclusive)
        @param count 取得するdraw履歴数
        @return draw履歴配列
        function drawHistoryByPersonaOwner (address personaOwner,uint256 fromIdx,uint256 count) public view returns(History[] memory)

------------------------------------------------------------------------------------------------------------------------------------------------

Drawchainの実行
============================================
| ①DrawChainを引く
| コントラクト：Drawchain

| ■ユーザーが操作時に実行されるfunction

DrawChainを引くfunction(Drawchain.sol)::

        @param drawChainId DrawChain ID
        @param personaId PERSONA ID
        @return 0：draw失敗。 0以外：historyのindex
        function draw(uint256 drawChainId,uint256 personaId) public returns(uint256)


| ②景品を配布した際にDrawChain作成者（パブリッシャー）に呼び出してもらう
| deliver(景品を配布した)したタイムスタンプを登録。

| ■パブリッシャー向けfunction

タイムスタンプを登録するfunction(Drawchain.sol)::

        @param historyId draw が成功した際に返す history Id
        function delivered(uint256 historyId)

.. admonition:: タイムスタンプについて

  | delivered()はオプションになります。
  | 景品を配布した際に呼び出しを行うことで、History構造体のdeliveredOnにタイムスタンプが登録されます。
  | 実行されなかった場合も配布の履歴がブロックチェーンレベルで残らないという点以外は影響はありません。
  | 実施頂くメリットとしては以下のような点になります。
  | ・ブロックチェーンレベルでタイムスタンプ設定されるため改ざんされない
  | ・将来スマートコントラクト上でのほかのプログラムとの連携がある場合に使用できる

------------------------------------------------------------------------------------------------------------------------------------------------


実装済み IDrawChainAuthorizer
============================================

| 現在利用可能なIDrawChainAuthorizerインターフェースを実装したコントラクトは以下となる。
| 有効にするには、DrawChain登録時のAuthorizerInfoにコントラクトを設定する必要がある。

draw可能な PERSONAの能力値を制限するコントラクト
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| (DrawAbilityLimitter.sol)
| square key ownerにより事前に能力値の制限を設定する必要がある。
| 設定後、DrawChain登録時のAuthorizerInfoにコントラクトを設定する。
| drawするPERSONAの能力値が設定された範囲内である場合、draw可能となる。

登録function::

        @param limit 能力値の制限を設定。Limit[6]はFOR,ABS,DFT,MND,INT,EXPの順となる。
        @return numPresets 登録番号
        function newPreset(Limit[6] calldata limit) public returns(uint256)

変更function::

        @notice presetIdに登録番号を指定。newPreset時のsenderのみ更新が可能。
        @param presetId 登録番号
        @param limit 能力値の制限を設定。Limit[6]はFOR,ABS,DFT,MND,INT,EXPの順となる。
        function alterPreset(uint256 presetId,Limit[6] calldata limit)

値::

        uint256 public numPresets;                      // 登録番号。newPresetでインクリメントされ、自動で振り当てられる。
        mapping(uint256 => Limit[6]) public preset;     // 登録番号と能力値の制限内容をマッピング
        mapping(uint256 => address) public presetOwner; // 登録番号とnewPreset時のsenderをマッピング

Limit::

        struct Limit {
            uint16 min;
            uint16 max;
        }

draw可能なPERSONA categoryを制限するコントラクト
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| (DrawPersonaCategoryLimitter.sol)
| DrawChain登録時のAuthorizerInfoにコントラクトを設定、presetIdに指定したいカテゴリを設定する。
| drawするPERSONAのPERSONA Idに含まれるカテゴリとpresetIdに指定したカテゴリが一致した場合、draw可能となる。


draw可能回数を制限するコントラクト
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| (DrawQuantityLimitter.sol)
| DrawChain登録時のAuthorizerInfoにコントラクトを設定、presetIdにdraw可能回数を設定する。
| drawされた回数が指定したdraw可能回数より小さい場合、draw可能となる。


draw()可能な呼び出し元をDrawChainに紐づくsquare key のフォロワーに制限するコントラクト
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| (DrawFollowerLimitter.sol)
| DrawChain登録時のAuthorizerInfoにコントラクトを設定する。
| drawを行ったユーザーが対象のDrawChainに紐づくsquare key のフォロワーかを判定し、フォロワーであった場合draw可能となる。

| square key のフォロワーはブラックリストを設定することができる。
| ブラックリストに登録するとフォロワーはフォローが外れ、再フォローすることができなくなる。
| 再フォローを実施するためにはブラックリストの登録を解除される必要がある。
| ブラックリストへの登録・登録解除はsquare key のオーナーが実施することができる。

| 【SquareSupplement.sol】

ブラックリストへの登録・登録解除function::

        @param squareKey 対象の squareKey
        @param _address フォロワーアドレス
        @param isBlack true: 登録、fale: 登録解除
        function setBlackList(uint256 squareKey,address _address,bool isBlack) public

同一PERSONAによるdraw()可能回数を制限するコントラクト
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| (DrawCountLimitter.sol)
| DrawChain登録時のAuthorizerInfoにコントラクトを設定、presetIdにdraw可能回数を設定する。
| 同一personaによってdrawされた回数が指定したdraw可能回数より小さい場合、draw可能となる。

