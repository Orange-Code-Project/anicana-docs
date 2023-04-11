###########################
ARCANA生成API
###########################

次のスクリプトタグをコンテンツ側に埋め込むことで、ARCANA生成画面を呼び出すことができます。

API仕様
===========================

------------------------------------
ARCANA生成ページ呼び出しスクリプト
------------------------------------


生成スクリプトサンプル::

    <script src="https://staging.anicana.org/arcana.js" id="gen_arcana_script" data-requestid="9999999" data-toaddr="0xFf5BC900110f5c4eb6Ce2faf2081B4151655B3f3" data-seed="10000" data-eggid="10" data-signature="0xdfe893d3906b31c0cfcc05b05387c7cf3bf31524caeac2fb5e3d7b9d144dbc9550a9ce41d92ad4c070c6f34c38ba8329d8d1b32818f2d01a637758f61b012a211c" data-callback="https://staging.anicana.org/test_button.html" data-logout="true" ></script> 
    <div style='text-align: center'><button onclick="__go_to_arcana_generator()">ARCANA生成</button></div>


.. csv-table::
    :header-rows: 1
    :align: center

    パラメータ, required/optional, 型, 説明
    id,               required, 文字列, gen_arcana_script (変更しないで下さい)
    src,              required, URL,     {endpoint}/arcana.js（endpointは環境情報ページを参照）
    data-eggid,       required, 数値,    パブリッシャーが保持するEGGのeggid。
    data-seed,        required, 数値,    seed
    data-signature,   required, 文字列,  パブリッシャーによる署名。署名生成手順ページを参照。
    callback-url,     optional, URL,     "callbackのURL。requestIdとtxHashがGETパラメータとして追加されてredirectされる。http://test.comを指定した場合、http://test.com?requestId=1&txHash=xxxxxのようになる。また、callbackは指定しなくても良い。その場合はportal上のウォレットページに遷移するボタンが表示される。"
    data-requestid,   required, 数値,    パブリッシャー毎の任意の数値（0 ~ 18446744073709551615）。check statusで使用。
    data-toaddr,      required, address, ARCANAの配布先wallet address
    data-logout,      optional, boolean, trueの場合、強制的に再ログインをさせる。falseの場合、セッション情報があれば自動ログイン、なければ再ログインをさせる。無しの場合、falseと同様。
    data-symbol,      optional, 文字列,  パブリッシャー側で設定できるシンボル。
    data-manaInfo,    optional, 文字列,  パブリッシャー側でテキストを設定できる。
    data-manaValue,   optional, 数値,    パブリッシャー側で設定できる数値。
    data-manaAddress, optional, address, 中断されたARCANA生成のmanaAddressを指定。


mana情報（manaInfo）::

    コンテンツでの体験情報や暗号化した個人情報などをここに書き込むことで、ARCANAに付加価値をもたせるなどの利用が想定される。
    
直接生成ページを呼び出す場合は以下のようにする。::

    {endpoint}/arcana-gen/{eggId}/{seed}/{signature}/{requestId}/{toAddress}?r={callbackUrl}&logout=true

   （mana情報あり）
    {endpoint}/arcana-gen/{eggId}/{seed}/{signature}/{requestId}/{toAddress}/{symbol}/{manaInfo}/{manaValue}?r={callbackUrl}&logout=true

   （manaAddress指定）
    {endpoint}/arcana-gen/{manaAddress}


※直接生成ページを呼び出す場合で、symbol, manaInfo, manaValue指定なしの場合、対象の箇所にnullを入れてください。

------------------------------------
check status
------------------------------------

ARCANA生成のステータスを参照する

method::

    GET

endpoint::

    /api/arcana-status/{wallet_address}/{request_id}


.. csv-table::
    :header-rows: 1
    :align: center

    パラメータ, 説明
    wallet_address, 署名者のアドレス(EGG保有者のアドレス)
    request_id, ARCANA生成API呼び出し時に指定したリクエストID


Sample response

.. code-block:: json

    {
        "data": {
            "status": "done",
            "transaction_id": "0x2e35551b1bf7bb6942610be99dcf60fafe804f167c19a2070c45ff1a0a7f50de"
        },
        "status": "success"
    }

statusの値（data内のstatus）

.. csv-table::
    :header-rows: 1
    :align: center

    ステータス, 説明
    no_transaction, ユーザはまだARCANA生成手順を完了していない。(離脱した場合も含む)
    transaction_created, ARCANA生成トランザクションをブロックチェーンに送信済みだが、結果未確定
    error, トランザクションがなんらかの原因で失敗して終了(ARCANAは生成されていない)
    done, ARCANAが生成されて正常終了


Error response

.. code-block:: json

    {
        "message": "request_idが見つかりません"
    }

備考::

    errorの場合は404


------------------------------------------------------------------------------------------------------------------------------------------

------------------------------------
ARCANA生成までの流れ
------------------------------------
ARCANA生成までの手順は以下のような流れになる。

#. Validatorセットアップ。
#. SHARDの付与、ANIMAの付与
#. Matrixの登録、Matrixの有効化
#. Validator管理画面でEGG生成を行う。
#. 専用のサイトでValidatorの秘密鍵を取得。
#. 取得した秘密鍵で署名を作成。
#. 上記で生成したEGG、署名を使用してARCANAを生成。

staging環境では以下の手順で実施でる。

#. Validator管理画面にメールアドレスで登録。walletが作成される。
#. 上記で発行されたwalletaddressのprivatekeyを専用のサイトを使用し取得。表示されたprivatekeyの頭に0xをつけて使用し、署名の作成を行う。
#. ステージング環境でのEGGは、Validator UIから生成して頂くのではなく、管理権限で発行を行います。
#. 発行されたEGGのIDをパラメーターのeggidに設定します。所持しているEGGはValidator管理画面で確認が行える。

