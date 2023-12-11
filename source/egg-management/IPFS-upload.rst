###########################
IPFSへのアップロード
###########################

| * EGG化する画像データ一式をIPFSにアップロードする
| 　⇒content hashが返却される
| * 画像データのcontent hashを書き込んだmetadata jsonをIPFSにアップロードする
| 　⇒content hashが返却される
| metadata jsonのcontent hashは `Matrix構築 <../egg-management/matrix-development.html>`_ 、 `PERSONAの生成 <../game-development/persona-introduction.html>`_ に使用する。

--------------------

.. admonition:: アップロードできる画像の制限について

  - IPFSから画像を取得するAPIで以下の制限を行っています。以下を満たさない場合は画像が取得できないため、ポータルサイト上にも画像を表示することができなくなります。
  - ファイルの形式がbmp, jpeg, png, gif
  - 20MiB以下

環境情報
==========================

各環境情報ページを参照。

