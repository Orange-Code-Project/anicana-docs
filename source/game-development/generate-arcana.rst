###########################
ARCANA生成API
###########################



次のスクリプトタグをコンテンツ側に埋め込むことで、ARCANA生成画面を呼び出すことができます。


API仕様
===========================


------------------------------------
ARCANA生成ページ呼び出しスクリプト
------------------------------------

テストネットエンドポイント::

    https://staging.anicana.org/

本番環境エンドポイント::

    https://anicana.org/

生成スクリプトサンプル::

    <script src="https://staging.anicana.org/arcana.js" id="gen_arcana_script" data-requestid="9999999" data-toaddr="0xFf5BC900110f5c4eb6Ce2faf2081B4151655B3f3" data-seed="10000" data-eggid="10" data-signature="0xdfe893d3906b31c0cfcc05b05387c7cf3bf31524caeac2fb5e3d7b9d144dbc9550a9ce41d92ad4c070c6f34c38ba8329d8d1b32818f2d01a637758f61b012a211c" data-callback="https://staging.anicana.org/test_button.html" data-logout="true" ></script> 
    <div style='text-align: center'><button onclick="__go_to_arcana_generator()">ARCANA生成</button></div>





.. csv-table::
    :header-rows: 1
    :align: center

    パラメータ, required/optional, 説明
    id, required, gen_arcana_script (変更しないで下さい)
    src, required, {endpoint}//arcana.js
    data-eggid, required, egg id
    data-seed, required, seed
    data-signature, required, game maker側による署名
    callback-url (URL), optional, "callbackのURL。requestIdとtxHashがGETパラメータとして追加されてredirectされる。http://test.comを指定した場合、http://test.com?requestId=1&txHash=xxxxxのようになる。また、callbackは指定しなくても良い。その場合はportal上のウォレットページに遷移するボタンが表示される。"
    data-requestid (数値) uint, required, パブリッシャー毎の任意の数値。 0 ~ 18446744073709551615
    data-toaddr, required, 配布先wallet address
    data-logout, optional, true/false、または無し。trueの場合、強制的に再ログインをさせる。falseの場合、セッション情報があれば自動ログイン、なければ再ログインをさせる。無しの場合、falseと同様。
    data-symbol, optional, パブリッシャー側で設定できるシンボル。
    data-manaInfo, optional, パブリッシャー側で設定できる。コンテンツの体験情報を設定。
    data-manaValue, optional, パブリッシャー側で設定できる数値。
    data-manaAddress, optional, 中断されたARCANA生成のmanaAddressを指定。


mana情報（manaInfo）::

    コンテンツでの体験情報を設定できる。
    例えばコンテンツ内で～を行った～を達成した等情報を設定する。
    パブリッシャーはmana情報をもとに、～を行った～を達成したというmana情報を持つARCANAの保持者を対象にしたサービスを行うことが可能となる。

直接生成ページを呼び出す場合は以下のようにする。::

    {endpoint}/arcana-gen/{eggId}/{seed}/{signature}/{requestId}/{toAddress}?r={callbackUrl}&logout=true

   （mana情報あり）
    {endpoint}/arcana-gen/{eggId}/{seed}/{signature}/{requestId}/{toAddress}/{symbol}/{manaInfo}/{manaValue}?r={callbackUrl}&logout=true

   （manaAddress指定）
    {endpoint}/arcana-gen/{manaAddress}

------------------------------------------------------------------------------------------------------------------------------------------

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
        "status": "done"
    }

statusの値

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


