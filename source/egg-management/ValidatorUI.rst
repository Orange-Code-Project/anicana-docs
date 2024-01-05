###########################
Validator管理画面
###########################

| ValidatorまたはValidatorからSquare Keyを発行された参加者には
| Validator管理画面が提供される。
| Validatorごとにデプロイされるため、URLは個々の管理者ごとに異なる。
| ノードへの参加申請や、EGGの生成などが行える。
| また、Queen、Knightの各種操作も管理画面から行う。
| 
| コンテンツ開発をする際に事前準備として必要な手順は以下の通り。
| Validator管理画面は主にEGGの生成を行う際に使用する画面となる。

.. csv-table::
    :header-rows: 1
    :align: center

    "手順", "詳細"
    "Validatorのセットアップ", ":doc:`Validatorセットアップ </validator/procedure>` を参照。"
    "Square Keyの生成", ":doc:`Square Keyの生成 </validator/create-square-key>` を参照。"
    "Matrixの開発依頼", ":doc:`Matrixの開発を依頼する </egg-management/matrix-development>` を参照。"
    "ANIMAの入手", ":doc:`ANM(ANIMA)を入手する </egg-management/anima>` を参照。"
    "EGGの生成", ":doc:`EGG生成する </egg-management/generate-eggs>` を参照。"


Private Keyの取得
============================================
| ログインユーザーのPrivate Keyを確認することができる。
| F12を押下しブラウザの開発ツールを表示する。コンソールに表示されているprivateKeyを確認。


   .. figure:: ../img/ValidatorUI/ValidatorUI-10.png


| その他画面の詳細について以下に示す。

DASHBOARD
============================================
* Queenタブ

Queenのアドレスと在任期間を確認できる。

#. Queenのアドレス
#. Queenの在任期間

   .. figure:: ../img/ValidatorUI/ValidatorUI-1.png

* Knightsタブ

Knightのアドレスとナンバーを確認できる。
Validatorは、この一覧の中のKnight1名からネットワーク参加承認を受ける必要がある。
承認されたValidatorは、承認したKnightのNoが紐付けられる。

#. Knightのアドレス
#. Knightのナンバー

   .. figure:: ../img/ValidatorUI/ValidatorUI-2.png

* Pawns

他のバリデーターの参加状況を確認。
アドレス、承認したKnightのNo、参加日付が確認できる。

#. Pawnのアドレス
#. Pawnを承認したKnightのNo
#. Pawnのノードへの参加日付

   .. figure:: ../img/ValidatorUI/ValidatorUI-3.png

-----------------------------------------------------------------------------------------------------------

PROFILE
============================================

右上のユーザーのマークを押下して遷移。
バリデーターの申請、申請状況の確認、ウォレットアドレスの確認ができる

#. PROFILEへの遷移アイコン
#. 自身の申請状況の確認
#. Knightへの申請ボタン。申請するKnightのナンバーを選択して申請を行う。
#. 自身のウォレットアドレス

   .. figure:: ../img/ValidatorUI/ValidatorUI-4.png

-----------------------------------------------------------------------------------------------------------

EGG
============================================

* EGG生成に関しては `こちら <../egg-management/generate-eggs.html>`_ を参照

-----------------------------------------------------------------------------------------------------------

KNIGHT
============================================

新規に参加したいValidatorに対しての参加承認、Queenの選挙・不信任案ができる。

#. 新規Validatorの承認
#. Queen選挙
#. Queen不信任投票

   .. figure:: ../img/ValidatorUI/ValidatorUI-5.png


| ・Pawn Requests
| 承認待ちリストが表示される。リストから承認・否認を実行できる。
| また、自身のKnight番号が承認したValidatorリストを表示。
| ※Knightでなければリストは空で表示される

#. 申請を行ったValidatorのアドレス
#. 申請日付
#. 承認・否認ボタン

   .. figure:: ../img/ValidatorUI/ValidatorUI-6.png

| ・Elect Queen
| Queenの選挙が行われる際に使用するページ。
| 選挙中の場合、投票先アドレスを選択して、投票を行うことができる。
| また、投票/信任されているアドレス一覧を表示。
| ※Knightでなければ閲覧できるだけで実行はできない

#. 投票先アドレスを選択して、投票

   .. figure:: ../img/ValidatorUI/ValidatorUI-7.png

| ・Remove Queen
| Queenへの不信任投票を行うページ。
| また、現在の投票数を表示。
| ※Knightでなければ閲覧できるだけで実行はできない

#. Queenへの不信任投票

   .. figure:: ../img/ValidatorUI/ValidatorUI-8.png

-----------------------------------------------------------------------------------------------------------


QUEEN
============================================

| Queen用の操作が行えるページ。
| Knightの任命とはく奪、デポジット量の設定を行える
| また、現在のKnight一覧を表示。
| ※Queenでなければ閲覧できるだけで実行はできない

#. ANIMA数量を入力し、設定することができる
#. 対象のKnightのはく奪。また、新たにKnightになるアドレスとKnight番号を指定しKnightに指名できる。

   .. figure:: ../img/ValidatorUI/ValidatorUI-9.png

