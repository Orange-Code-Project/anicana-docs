###########################
署名生成手順
###########################

ARCANAトークンを生成するにあたり、Validator(コンテンツ側)が持つEGGトークンを、ユーザがARCANAに変換することを許可する必要がある。
また、このときコンテンツの結果値をARCANAトークンに埋め込むため、この値を改竄されずにトークンに書き込む必要がある。
これを行うために、コンテンツサイドで署名を作成し、その署名を使ってユーザがトランザクションを送信するという手順を行う。

------------------------------------------------------------------------------------

署名データの作成
===================================

署名データを作成するには、下記のデータが必要。

* eggid : 対象のEGG トークンのID
* toAddr : ARCANA生成先のアドレス（EGGの開封許諾を与える相手）
* seed : コンテンツの結果値 
* contract : Incubatorのコントラクトアドレス
* privateKey : eggidオーナのprivate key

上記データを元に、以下の手順で署名対象データ:dataToBeSigned を作成する。::

    const genSig = require("./genSig.js");

    const signature = genSig.forIncubate(eggid,toAddr,seed,contract,privateKey);

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

