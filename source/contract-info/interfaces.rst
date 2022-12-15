###########################
インタフェース仕様
###########################

MATRIX規格
============================================

以下のインタフェースを持つコントラクトは、MatrixとしてMatrixMasterに登録できる。::

    /** @notice Eggを生成する
     * @param metadataHash 生成するeggに与えるメタデータのハッシュ
     * @param to Eggの生成先
     * @return 生成したEggのID
     */
    function spawn(string calldata metadataHash, address to) external returns (uint256);

    // Eggの生成に必要とするAnimaの量を返す。生成に連動して、支払われたAnimaが開発者に付与される。
    function getPrice() external view returns (uint256);

    // Matrix使用者はここで返されるIDのスクエアキーを持つユーザに限られる。
    function correspondingSquareKey() external view returns (uint256);


-------------------------------


その他スマートコントラクトのインタフェース
============================================

githubで公開予定


