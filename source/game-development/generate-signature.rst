###########################
署名生成手順
###########################

ARCANAトークンを生成するにあたり、Validator(コンテンツ側)が持つEGGトークンを、ユーザがARCANAに変換することを許可する必要がある。
また、このときコンテンツの結果値をARCANAトークンに埋め込むため、この値を改竄されずにトークンに書き込む必要がある。
これを行うために、コンテンツサイドで署名を作成し、その署名を使ってユーザがトランザクションを送信するという手順を行う。
eggidオーナのprivate keyは専用のサイトで取得することができる。

------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ARCANA生成時に使用する署名データの作成
======================================================================

署名データを作成するには、下記のデータが必要。

.. csv-table::
    :header-rows: 1
    :align: center

    パラメータ, 説明
    eggid,       対象のEGG トークンのID
    toAddr,      ARCANA生成先のアドレス（EGGの開封許諾を与える相手）
    seed,        コンテンツの結果値 
    contract,    Incubatorのコントラクトアドレス
    privateKey,  eggidオーナのprivate key。専用のサイトで取得した秘密鍵の頭に"0x"を付与して設定。

上記データを元に、以下の手順で署名対象データdataToBeSigned を作成する。::

    const genSig = require("./genSig.js");

    const signature = genSig.signForIncubate(eggid,toAddr,seed,contract,privateKey);

------------------------------------------------------------------------------------------------------------------------------------------------------------------------

PERSONA配布時に使用する署名データの作成
======================================================================

.. csv-table::
    :header-rows: 1
    :align: center

    パラメータ, 説明
    from,       PERSONA トークンの保有者のアドレス
    to,         PERSONA トークンの転送先のアドレス
    tokenId,    対象のPERSONA トークンのID
    contract,   PERSONAのコントラクトアドレス
    privateKey, PERSONA トークンのオーナのprivate key。専用のサイトで取得した秘密鍵の頭に"0x"を付与して設定。

上記データを元に、以下の手順で署名対象データを作成する。::

    const genSig = require("./genSig.js");
    
    const sigInfoApp = genSig.signForPersonaApprove(to, tokenId, contract, privateKey);

    const sigInfoAppNonce = sigInfoApp.nonce;
    const sigInfoAppSign  = sigInfoApp.sign;

    const sigInfoTrans = genSig.forPersonaTransferFrom(from, to, tokenId, contract, privateKey);

    const sigInfoTransNonce = sigInfoTrans.nonce;
    const sigInfoTransSign  = sigInfoTrans.sign;


------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ライブラリ
======================================================================

環境情報を参照。

