###########################
ゲーム開発概要
###########################


あなたのゲームとアニカナを接続すると、あなたのゲームのユーザにアルカナNFTを生成する機会を提供することができる。
ゲームをプレイした結果に応じて、ユーザは自分の好きな画像や名前を設定したアルカナNFTを自分のウォレットに獲得することができる。

アルカナNFTはゲームメーカーが所持するEGGから生成され、EGGはそれぞれ遺伝子情報を持ち、生成されるアルカナNFTの持つ「パラメータ」に影響を与える。
また、EGGからアルカナが生成される際にゲーム側からseed値をアルカナNFTに与える必要があり、このseed値によっても「パラメータ」は影響を受ける。


-----------------------------------------------------------------------------------

導入の流れ
=======================================

事前準備として必要な手順は以下の通り。

.. csv-table::
    :header-rows: 1
    :align: center

    "手順", "詳細"
    "Validatorのセットアップ", ":doc:`Validatorセットアップ </validator/procedure>` を参照。"
    "Square Keyの生成", ":doc:`Square Keyの生成 </validator/create-square-key>` を参照。"
    "Matrixの開発依頼", ":doc:`Matrixの開発を依頼する </egg-management/matrix-development>` を参照。"
    "Animaの入手", ":doc:`ANM(Anima)を入手する </egg-management/anima>` を参照。"
    "Eggの生成", ":doc:`EGG生成する </egg-management/generate-eggs>` を参照。"


ゲーム開発において行うことができるのは以下の2つ。

.. csv-table::
    :header-rows: 1
    :align: center

    "手順", "詳細"
    "ゲームとウォレットの接続", ":doc:`ウォレット接続 </game-development/wallet-connection>` を参照。"
    "Arcana生成API連携", ":doc:`アルカナ生成フロー </game-development/call-arcana-generator>` を参照。"
    "LEVICA決済", ":doc:`LEVICA決済 </game-development/levica>` を参照。"




