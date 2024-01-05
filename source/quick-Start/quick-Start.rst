###############################################
パブリッシャー向けクイックスタート
###############################################

| ANICANAネットワークにValidatorとして参加し、ARCANA生成を行うまでの必要な手順を紹介する。
| ★マークがパブリッシャーが実施対象のもの、それ以外はANICANAテクニカルサポートチームが実施する。

-----------------------------------------------------------------------------------

初期設定
=======================================
ANICANAネットワークに参加するための手順
-----------------------------------------------------------------------------------

#. ★ウォレットへの登録を行い、ウォレットアドレスを取得
#. ★AWSアカウントを準備する
#. Validatorのセットアップを行う。

   .. figure:: ../img/quickStart/QuickStartGuideSetup.png

参考ページ

.. csv-table::
    :header-rows: 1
    :align: center

    "内容", "参考ページ"
    "★ANICANAウォレットでValidator用のブロックチェーンアドレスを取得する", ":doc:`ANICANAウォレットに登録する </validator/wallet-registration>`"
    "★AWS(Amazon Web Services)のアカウントを用意する", ":doc:`AWSアカウントの準備 </validator/aws-preparation>`"
    "AWS上でValidatorの各要素をセットアップする", ":doc:`Validatorセットアップ </validator/validator-setup>`"
    "Knights of the Round Table にて参加ノードとしての承認を受ける", ":doc:`Validator候補にアプライする </validator/validator-application>`"
	"Knights of the Round Tableとは", ":doc:`Knights of the Round Table </mechanism/knights-of-the-round-table>`、:doc:`Knights of the Round Table の役職 </mechanism/rounds-of-logic>`"


コンテンツ開発
=======================================
Matrixを構築する手順
-----------------------------------------------------------------------------------

#. Matrixの実装、デプロイを行う。
#. SquareKeyを生成する。
#. ★ANIMAを入手する。
#. MatrixにEgg生成の単価、SquareKeyを設定し登録を行う。
#. 上記の実行でMatrixIDを入手。

   .. figure:: ../img/quickStart/QuickStartGuideDevContents.png

参考ページ

.. csv-table::
    :header-rows: 1
    :align: center

    "内容", "参考ページ"
    "EGG管理を行うためのSquare Keyを取得する", ":doc:`Square Keyを生成する </validator/create-square-key>`"
    "★EGGを生成するためのMatrixの開発依頼を行う", ":doc:`Matrixの開発を依頼する </egg-management/matrix-development>`"
    "★Matrixを登録するためのANIMAを入手する", ":doc:`ANM(ANIMA)を入手する </egg-management/anima>`"
    "Shard、EGG、ANIMA、ARCANAとは", ":doc:`ARCANA life cycle </mechanism/ARCANA-life-cycle>`、:doc:`ANICANA life cycle </mechanism/ANICANA-life-cycle>`"


.. admonition:: ANIMAの入手について

  ANIMAはテクニカルサポートチームから提供する場合があります。

運用関係
======================================
EGG生成を行う手順
-------------------------------------------------------------------------------------------------------------------------------

#. ★Shardを入手し、Matrixに転送する。
#. ★ANIMAを入手する。
#. ★Validator管理画面よりEggを生成する。

   .. figure:: ../img/quickStart/QuickStartGuideMintEgg.png

参考ページ

.. csv-table::
    :header-rows: 1
    :align: center

    "内容", "参考ページ"
    "★Shardの収集", ":doc:`ARCANAの分解 </contract-info/decomposition>`"
    "★EGG生成するためのANIMAを入手する", ":doc:`ANM(ANIMA)を入手する </egg-management/anima>`"
    "★EGG生成を行う", ":doc:`EGG生成する </egg-management/generate-eggs>`"
    "Shard、EGG、ANIMA、ARCANAとは", ":doc:`ARCANA life cycle </mechanism/ARCANA-life-cycle>`、:doc:`ANICANA life cycle </mechanism/ANICANA-life-cycle>`"


.. admonition:: Shard、ANIMAの入手について

  Shard、ANIMAはテクニカルサポートチームから提供する場合があります。

ARCANAを生成するための手順
-----------------------------------------------------------------------------------

#. ★ARCANA生成に使用するEGGを決定
#. ★ARCANAを付与するユーザーのウォレットアドレスを決定
#. ★署名データの作成
#. ★生成APIにてARCANAを生成

   .. figure:: ../img/quickStart/QuickStartGuideArcana.png

参考ページ

.. csv-table::
    :header-rows: 1
    :align: center

    "内容", "参考ページ"
    "★ARCANA生成時に使用するEGGの情報を取得する", ":doc:`保有EGGの一覧取得 </game-development/egg-balance>`"
    "★ユーザ情報と、ウォレットアドレス情報の紐付け", ":doc:`ユーザウォレットの取得 </game-development/user-registration>`、:doc:`ウォレット接続 </game-development/wallet-connection>`"
    "★ARCANA生成時に使用する署名データの作成を行う", ":doc:`署名生成手順 </game-development/generate-signature>`"
    "★ARCANA生成APIとの連携をおこなう", ":doc:`ARCANA生成手順 </game-development/call-arcana-generator>`、:doc:`ARCANA生成API </game-development/generate-arcana>`"
    "ARCANA生成の仕組み", ":doc:`ARCANA生成の仕組み </mechanism/arcana-generate>`"
