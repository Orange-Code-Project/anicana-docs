###########################
Matrixの開発を依頼する
###########################

Matrixの開発
==========================
| ARCANAトークンを生成する元となるEGGトークンは、Matrixにより生成される。
| エンジニアが特定の規格に沿って作ることで、独自のMatrixをネットワークに展開できる。
| ※ 依頼を受けた開発エンジニアが、以下の手順でMatrixの構築を行う。

--------------------------------

Matrix構築手順
==========================

構築には以下の工程が必要。

* Matrixを規格に沿ってコーディングする。(solidityスマートコントラクト)
* ARCANA SHARDを入手する。
* Matrixコントラクトをデプロイ
* MatirxコントラクトにARCANA SHARDを転送
* MatirxコントラクトにEGG生成1回辺りのpriceを設定
* Matirxコントラクトにmetadataのcontent hashを設定（ `IPFSへのアップロード <../egg-management/IPFS-upload.html>`_ を参照）
* MatirxコントラクトにSquareKey IDを設定
* MatrixMasterコントラクトにMatrixコントラクトを登録(ブロードキャスト)
* MatrixMasterにより付与されたMatrixIdをValidator管理者に知らせる

--------------------------------

Matrixの規格
==========================

Matrixの規格は `こちら <../contract-info/interfaces.html>`_ を参照。

--------------------------------

Matrixテンプレート
==========================

githubにて公開予定


