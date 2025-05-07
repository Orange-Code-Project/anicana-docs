###########################
Automated Bidder Service
###########################

====================================
Automated Bidder Service
====================================

| ECSで動作する自動入札サービス。Arcanaトークンのオークションを監視し、設定された条件に基づいて自動入札を行うサービスを作成することができる。
| 以下に必要な情報を提供する。

コントラクト情報
============================

オークションの情報取得(ExtractorAuction.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

     @param tokenId ERC721トークンのID。
     @return auction オークション情報。
     @return maxBid 最高入札額
    function auctionInfo(uint256 tokenId) public view override returns (Auction memory auction, Bid memory maxBid){auction = auctions[tokenId];maxBid = bids[maxDepositByKey(tokenId)];}


Auction
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

            struct Auction {
                uint256 tokenId;
                uint256 budget;
                uint256 tentativeBid;
                address budgetProvider;
                /// @notice オークションのステータス。ACTIVE = 1;、WAIT_FOR_FINALIZE = 2;、WAIT_FOR_REFUND = 3;、DEAD = 4;
                uint8 state;
            }


オークション情報を含む AuctionWithMaxBid 構造体の配列を返す(ExtractorAuction.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

        @param offset 開始トークンID（含む）
        @param count 取得件数（含む）
        @return オークション情報を含む AuctionWithMaxBid 構造体の配列
        function getActiveAuction(uint256 offset, uint256 count) public view returns (AuctionWithMaxBid[] memory)


オークションに入札(ExtractorAuction.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

        @param tokenId 対象のトークンID
        @param bidAmount 入札額
        @param requestShard 報酬をShardで受け取るか否か
        @return bidId 入札ID
        function placeBid(uint256 tokenId,uint256 bidAmount,bool requestShard) public override authorized("WHITE_BIDDER") notBlocked("BLACK_BIDDER") returns (uint256)


入札の取り消し(ExtractorAuction.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

        @param bidId 入札ID
        function cancelBid(uint256 bidId) external


対象のトークンの予算を取得(ExtractorBudget.sol)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

        @param tokenId 対象のトークンID
        @return Budget
        function getBudget(uint256 tokenId) public view returns (Budget memory)

Budget
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

        struct Budget {
                /// @notice 予算が支払われたかどうかを示す。
                address paid;
                /// @notice 関連するERC721トークンがburnされたかどうかを示します。
                bool tokenBurned;
                /// @notice 予算提供者のアドレス
                address budgetProvider;
                /// @notice 予算に関連付けられたERC721トークンのID
                uint256 tokenId;
                /// @notice 予算に割り当てられたAnimaの量
                uint256 animaAmount;
                /// @notice 予算に割り当てられたlevicaの量
                uint256 levicaAmount;
                /// @notice 払った時のtimestamp
                uint256 paidTimestamp;
                /// @notice shardの転送先
                address tokenReceiverAddress;
                /// @notice Publisherのアドレス
                address publisherAddress;
            }

