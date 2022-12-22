###########################
EGGを生成する
###########################

Validator管理画面内のEGGページで、EGGを生成することができる。
(Validator管理画面はValidatorごとにデプロイされるため、URLは個々の管理者ごとに異なる)

.. image:: ../img/egg-management-ui.png

--------------------

生成手順
================

#. MatrixIdの入力 (IDは開発エンジニアから入手)
#. Get PriceでEGG生成コストを取得
#. Number of eggsに生成する個数を入力
#. Generate EggsでEGG生成トランザクションを発行 (Animaを消費する)

.. image:: ../img/egg-management-ui2.png


.. admonition:: EGGの生成個数について

  Number of eggsに入力する値は、MAXで1000までとしてください。
  それ以上の値はエラーになる場合があります。

.. admonition:: EGG生成に失敗する場合の確認点

  - EGG生成に使用するANMが不足していないか
  - Matrix内にShardが不足していないか
  - Matrixに対応するSquare Keyを所持しているか
