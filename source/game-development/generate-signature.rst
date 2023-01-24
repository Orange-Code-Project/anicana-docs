###########################
署名生成手順
###########################

ARCANAトークンを生成するにあたり、Validator(ゲームシステム側)が持つEGGトークンを、ユーザがARCANAに変換することを許可する必要がある。
また、このときゲームの結果値をARCANAトークンに埋め込むため、この値を改竄されずにトークンに書き込む必要がある。
これを行うために、ゲームサイドで署名を作成し、その署名を使ってユーザがトランザクションを送信するという手順を行う。

この署名付き転送許諾の処理フローの実行手順を解説する。


------------------------------------------------------------------------------------

処理フロー
===================================

* 署名対象データの作成
* EGG保有者による署名作成

------------------------------------------------------------------------------------

署名対象データの作成
===================================

署名対象データを作成するには、下記のデータが必要。

* eggid : 対象のEGG トークンのID
* toAddr : ARCANA生成先のアドレス（EGGの開封許諾を与える相手）
* seed : ゲームの結果値 
* contract : Incubatorのコントラクトアドレス
* privateKey : eggidオーナのprivate key

上記データを元に、以下の手順で署名対象データ:dataToBeSigned を作成する。::

    const genSig = require("./genSig.js");

    const dataToBeSigned = genSig.forIncubate(eggid,toAddr,seed,contract,privateKey);

-------------------------
ライブラリ
-------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    ライブラリ, ファイル
    genSig, :download:`genSig.js<../lib/genSig.js>`
    genSig.cfg.json, :download:`genSig.cfg.json<../lib/genSig.cfg.json>`

.. caution:: 
   使用する環境のchainIdをgenSig.cfg.jsonに設定してください。また、genSig.cfg.json は genSig.jsから参照されます。同じフォルダ内に配置してください。

------------------------------------------------------------------------------------------------------------------------------------------------------------------------

署名の作成
===================================

署名を作成するには下記のデータが必要。

* dataToBeSigned : 署名対象データ
* privateKey : 署名者（トークン所有者）のプライベートキー

上記データを元に、以下の手順で署名:signForApproval を作成する。::


    const ethutil = require('ethereumjs-util');

    const {v, r, s} = ethutil.ecsign(dataToBeSigned, ethutil.toBuffer(privateKey));
    const signForApproval = ethutil.toRpcSig(v, r, s);


