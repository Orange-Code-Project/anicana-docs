###########################
保有EGGの一覧取得
###########################

現在自分が保有するEGGの一覧を取得するサンプル

コントラクト、RPC、abiファイルはテスト環境情報を参照

------------------------------------------------------------------------------------------------------------------------------------------

EGG一覧取得例(js)::

        var Web3 = require('web3');
        var eggAbi = require("./egg.json");

        const web3 = new Web3("http://18.185.94.194:8545/");

        const eggAddr = "0xb374640Ca3E3DA6F836ca8c60130fCAE2da3B929";
        const holderAddr = "0xe092b1fa25DF5786D151246E492Eed3d15EA4dAA";

        const eggContract = new  web3.eth.Contract(eggAbi, eggAddr);

        const listOfEggs = async() => {

            var balance = await eggContract.methods.balanceOf(holderAddr).call();
            console.log(balance);

            var eggIds = [];
            for(var i=0; i<balance; i++){
                var res = await eggContract.methods.tokenOfOwnerByIndex(holderAddr, i).call();
                eggIds.push(res);
            }

            console.log(eggIds);
        }


保有EGG一括取得function::

        /// @param account トークンを保持しているアカウントのアドレス
        /// @param index 取得したいトークンのindex番号
        /// @param limit 取得したいトークンの最大数
        /// @return トークン情報の配列
        /// limit = 1000程度までは1回で取得可能。上限はスマートコントラクトの状態によるが、上限を超えるとエラーが返る。
        function tokenOfOwnerByIndexBatch(address owner, uint256 index, uint256 limit) public view returns (uint256[] memory)

