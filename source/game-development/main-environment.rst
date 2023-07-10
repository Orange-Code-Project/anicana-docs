###########################
本番環境情報
###########################

本番環境一覧

-------------------------------------------------------------------

-------------------------
環境情報
-------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    項目, 説明
    Chain ID, 222222
    JSON-RPC, "https://chains.anicana.org/"

-------------------------------------------------------------------

-------------------------
コントラクトアドレス
-------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    コントラクト名, アドレス
    Anima,                      0x8C391195dC7Cb68D125EF35b73c859037603E548
    Arcana,                     0x3923fCc1a12F385165bBF722c50A22B1d18335CD
    Decomposer,                 0x73FD0678B2cD71be54EFBE069489a498Fdf820D2
    Egg,                        0x9c382dd80F9D0865a7fC0953BaB6EdDb186FBaBa
    EggBuilder,                 0x4cA9451003aD629e47d0C47d1164d6B66693811d
    Incubator,                  0x46eaeBB59a49C4D2363e6a7134710D943AF1aAEb
    MatrixMaster,               0xAfC75DD63b30c55a3610ffa447c98c8c88CA1d0c
    Shard,                      0xD1cF6C92DE56C791e036fA4d21914213c6CBaC8a
    Square,                     0x52AB107d2c3Fb91aE2028d72105Aa8Bb5C55E667
    ArcanaGeneratorInfo,        0x338A498Ac956B67730c667efD02252bE1E2615b7
    EggSupplement,              0x4ed738d18e91baE47479b98302fA5936872C676e
    SquareSupplement,           0xa576401d922Ec79c7B6b93637f1BAd1A72D20CfF
    ContentsScopeApprover,      0x1000c42284Fa3BFD2F37280Fe1b61ab56bC894AA
    AbsorbAuthority,            0x4033696a12Ce2f6fF7ADDfD1D9F80C31Ea55C12A
    DrawChain,                  0x894aB05BF700BA567530EBB1C2e8E5319DdB4233
    Persona,                    0xCA6f428D07b00837C047bbeBe4a75F993C2288c1
    DrawAbilityLimitter,        0x13DaD62abfa9AA67f2AcFcDC48007c16205D36D6
    DrawPersonaCategoryLimitter,0x1373c316d6DFC796F8C85b29160694AA8D229291
    DrawQuantityLimitter,       0xFC645cfC6cF992726D82183FF9E19B1c7E811f10
    DrawFollowerLimitter,       0x4c5443f1A3A774c4ef2F1ea5915510ff3D17BC2f
    AbsorbIntervalApprover,     0x677c1cF5b1A41A0dCeb954beAA30F18228B2c521

-------------------------------------------------------------------

-------------------------
コントラクトABI
-------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    コントラクト, abi
    Egg,                         :download:`Egg.json<../file_main/abi/Egg.json>`
    ArcanaGeneratorInfo,         :download:`ArcanaGeneratorInfo.json<../file_main/abi/ArcanaGeneratorInfo.json>`
    EggSupplement,               :download:`EggSupplement.json<../file_main/abi/EggSupplement.json>`
    SquareSupplement,            :download:`SquareSupplement.json<../file_main/abi/SquareSupplement.json>`
    ContentsScopeApprover,       :download:`ContentsScopeApprover.json<../file_main/abi/ContentsScopeApprover.json>`
    AbsorbAuthority,             :download:`AbsorbAuthority.json<../file_main/abi/AbsorbAuthority.json>`
    DrawChain,                   :download:`DrawChain.json<../file_main/abi/DrawChainV1.json>`
    Persona,                     :download:`Persona.json<../file_main/abi/Persona.json>`
    DrawAbilityLimitter,         :download:`DrawAbilityLimitter.json<../file_main/abi/DrawAbilityLimitter.json>`
    DrawPersonaCategoryLimitter, :download:`DrawPersonaCategoryLimitter.json<../file_main/abi/DrawPersonaCategoryLimitter.json>`
    DrawQuantityLimitter,        :download:`DrawQuantityLimitter.json<../file_main/abi/DrawQuantityLimitter.json>`
    DrawFollowerLimitter,        :download:`DrawFollowerLimitter.json<../file_main/abi/DrawFollowerLimitter.json>`

-------------------------------------------------------------------

-------------------------
インターフェース
-------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    IF, ダウンロード
    IDrawChainAuthorizer, :download:`IDrawChainAuthorizer.sol<../file_main/if/IDrawChainAuthorizer.sol>`
    IAbsorbApprover,      :download:`IAbsorbApprover.sol<../file_main/if/IAbsorbApprover.sol>`

-------------------------------------------------------------------

-------------------------
ライブラリ
-------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    ライブラリ, ファイル
    genSig,          :download:`genSig.js<../file_main/lib/genSig.js>`
    genSig.cfg.json, :download:`genSig.cfg.json<../file_main/lib/genSig.cfg.json>`

.. caution:: 
   使用する環境のchainIdをgenSig.cfg.jsonに設定してください。また、genSig.cfg.json は genSig.jsから参照されます。同じフォルダ内に配置してください。

-------------------------------------------------------------------

-------------------------
ANICANAポータルサイト
-------------------------

- `ANICANAポータルサイト(本番環境) <https://anicana.org/>`_

-------------------------------------------------------------------

------------------------------------
ARCANA生成ページ呼び出しスクリプト
------------------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    "環境", "APIエンドポイント（base_url）"
    "本番環境","https://anicana.org/"

------------------------------------------------------------------------------------------

------------------------------------
check status
------------------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    "環境", "APIエンドポイント"
    "本番環境","https://api.anicana.org/"

------------------------------------------------------------------------------------------

------------------------------------
ログインスクリプト
------------------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    "環境", "APIエンドポイント（base_url）"
    "本番環境","https://anicana.org/"

-------------------------------------------------------------------

-------------------------
LEVICA
-------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    "環境", "APIエンドポイント（base_url）"
    "プロダクション", "http://levica-prod-apilb-1703316262.ap-northeast-1.elb.amazonaws.com"

-----------------------------------------------------------------------------------------------------------------

-------------------------
IPFS
-------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    項目, 説明
    APIサーバーエンドポイント, "http://chainapi.octillion.jp/"
    Swagger UI, "https://chainapi.octillion.jp/docs#/"
    IPFS gateway, "http://ipfs.octillion.jp/"

