###########################
ウォレットの接続
###########################

API仕様
===========================

------------------------------------
ログインスクリプト
------------------------------------

環境情報は各環境情報ページを参照。

生成スクリプトサンプル::

    <script src="https://staging.anicana.org/login.js" id="anikana_login_script" data-call-id="9999999" data-sign-text="HELLO"  data-callback="https://staging.anicana.org/test_login.html" data-logout="true" ></script>
    <div style='text-align: center'><button class='' onclick='__open_portal_login()'>Login</button></div>

※optionalのパラメーターで不要なものはパラメータのkeyごと省略する。

.. csv-table::
    :header-rows: 1
    :align: center

    パラメータ, required/optional, 型, 説明
    id,                 required, 文字列,  anikana_login_script (変更しないで下さい)
    src,                required, URL,     {endpoint}/login.js（endpointは環境情報ページを参照）
    data-call-id,       required, 数値,    パブリッシャー毎に一意の数値。コンテンツ側で、どの遷移からのユーザーが戻ってきたかなどを判別するための機能となっている。その情報が特に必要なければ9999999で問題ない。
    data-sign-text,     optional, 文字列,  署名対象のテキスト(ワンタイムトークン)
    data-callback,      required, URL,     コールバックURL. ログイン完了後、callId、 sign、 address (ユーザーのwallet address) がGETパラメータに追加されてリダイレクトされる。
    data-logout,        optional, boolean, trueの場合、強制的に再ログインをさせる。falseの場合、セッション情報があれば自動ログイン、なければ再ログインをさせる。無しの場合、falseと同様。
    data-referral-code, optional, 文字列,  affiliateから渡されるreferral codeをセットする。英数字64文字固定。


| ・data-sign-text
| 高度なセキュリティを実装したい場合に設定が可能。
| 詳細は `こちら <../appendics/data-sign-text.html>`_ を参照。

