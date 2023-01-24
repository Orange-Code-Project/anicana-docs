###########################
インタフェース仕様
###########################

MATRIX規格
============================================

以下のインタフェースを持つコントラクトは、MatrixとしてMatrixMasterに登録できる。::

    // MatrixMasterに対して、EGGの材料を提示する。
    function spawnCondition() external returns(IEggBuilder.ComposeCondition memory);

    // EGGの生成に必要とするANIMAの量を返す。生成に連動して、支払われたANIMAが開発者に付与される。
    function getPrice() external view returns (uint256);

    // Matrix使用者はここで返されるIDのスクエアキーを持つユーザに限られる。
    function correspondingSquareKey() external view returns (uint256);

    // オーナーを確認する。
    function getOwner() external view returns (address);

-------------------------------


その他スマートコントラクトのインタフェース
============================================

githubで公開予定


