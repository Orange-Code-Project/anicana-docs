###########################
ARCANAの生成情報
###########################

| ARCANA生成の仕組みは `こちら <../mechanism/arcana-generate.html>`_ を参照。
| 環境情報は各環境情報ページを参照。

------------------------------------
ARCANAの生成情報
------------------------------------

ARCANAの生成情報はArcanaGeneratorInfoで管理されており、以下の情報を保持している。

InfoStatus::

         struct InfoStatus{
             Info info;   // 下記のInfo情報
             bool isDone; // true：生成済、false：未生成
         }

Info::

         struct Info {
             string manaAddress;  // マナアドレス
             uint256 eggId;       // 生成に使用する/したeggid
             address beneficiary; // 付与先（ユーザー）のwalletaddress
             uint256 seed;        // 生成に使用する/したseed
             bytes signature;     // 生成に使用する/した署名
             uint256 timestamp;   // タイムスタンプ
         }


■パブリッシャー向けfunction

InfoStatusの配列の長さを取得::

         @param beneficiary walletaddress
         @returns uint256   紐づくInfoStatusの配列の長さ
         function getInfoCountByBeneficiary(address beneficiary) public view returns (uint256)



InfoStatusを取得::

         @param beneficiary walletaddress
         @param startIndex  
         @param limit 取得個数
         @returns result InfoStatus[]
         function getInfoByBeneficiary(address beneficiary, uint256 startIndex, uint256 limit) public view returns (InfoStatus[] memory result)

