###########################
ARCANA生成手順
###########################

ARCANA生成は、通常はIPFSとANICANA Chainスマートコントラクトとの連携によって行うことができる。

* トークン画像のアップロード(IPFS)
* metadata JSONの生成をアップロード(IPFS)
* EGGの生成と保有
* 保有するEGGをユーザに開封許可する署名生成
* ユーザによるトランザクション署名
* ARCANA生成トランザクションの実行

これらの処理をコンテンツ側が独自に実装するのは煩雑なため、ANICANAポータルがこの処理をサポートするAPIを提供している。
コンテンツ側は、フロントエンドにスクリプトタグを埋め込み、必要なパラメータを付与するだけで、ユーザをARCANA生成ページに遷移させ、
ARCANA生成を行わせることができる。

---------------------------------------------------------------------------------------------------------------------------------------------------------------

ARCANA生成ページ(API)との連携フロー
============================================

.. image:: ../img/flow_arcana_generation.png


Ark.one環境でのARCANA生成
============================================

Ark.one環境では以下の手順でARCANA生成を行うことができる。

#. Validator管理画面にメールアドレスで登録しwalletを作成。
#. 上記で発行されたwalletaddressのprivatekeyを取得。このprivatekeyを使用して署名の作成を行う。privatekeyはValidator管理画面に対象ユーザーでログインし、ブラウザの開発ツールのコンソールから確認できる。
#. Ark.one環境でのEGGは、Validator管理画面から生成するのではなく、テクニカルサポートチームが管理権限で発行を行う。

