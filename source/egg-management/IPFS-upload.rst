###########################
IPFSへのアップロード
###########################

* EGG化する画像データ一式をIPFSにアップロードする

　⇒content hashが返却される

* 画像データのcontent hashを書き込んだmetadata jsonをIPFSにアップロードする

　⇒content hashが返却される

metadata jsonのcontent hashは `Matrix構築 <../egg-management/matrix-development.html>`_ に使用する。

--------------------

環境情報
==========================

* テスト環境

.. csv-table::
    :header-rows: 1
    :align: center

    項目, 説明
    APIサーバーエンドポイント, "https://stg.anicana-api.akqjt.io/"
    Swagger UI, "https://stg.anicana-api.akqjt.io/docs#/"
    IPFS gateway, "https://stg.anicana-api.akqjt.io/ipfs/"

* 本番環境

.. csv-table::
    :header-rows: 1
    :align: center

    項目, 説明
    APIサーバーエンドポイント, "http://chainapi.octillion.jp/"
    Swagger UI, "https://chainapi.octillion.jp/docs#/"
    IPFS gateway, "http://ipfs.octillion.jp/"

