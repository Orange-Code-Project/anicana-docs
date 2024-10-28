###################################
Ark.one環境情報
###################################

Ark.one環境一覧

.. caution::
    | Ark.oneは有志により提供されているテストネットです。
    | テスト環境のため、テストネット内で発行されたトランザクションの保証は行われません。
    | 現実の金銭が関わるようなアクションは行わないようにしてください。

---------------------------------------------------------------------------------------------------------------

-------------------------
環境情報
-------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    項目, 説明
    Chain ID, 222221
    JSON-RPC, "https://stgchains.anicana.org/"

-------------------------------------------------------------------

-------------------------
コントラクトアドレス
-------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    コントラクト名, アドレス
    Anima,                      0x18F4a9E35d99E8E736f31eF11aA36F5D4ce7023c
    Arcana,                     0xd7639Fc0cD23984b7F1F250803F0a7ad9D1eFAa8
    Decomposer,                 0x837B0315d7dCB5ffaAc91b2dC085528c1fF75CE0
    Egg,                        0x266Dc32CeabC06bC54469E8FAd9bE65efAfb66E8
    EggBuilder,                 0xEcA31401263042B2Ec98457D0Ae1CaB9064f948E
    Incubator,                  0x9C4EE916C997A469802A3F91ff729350A708C1cF
    MatrixMaster,               0x39BaC9943e4266096854029141867592E7958D3F
    Shard,                      0x4Ca7323b9fB0EEc64ff23De4dCC67f434626FcEd
    Square,                     0x8D3c73943b5ec3b64aeA43CD197F4214b0E70C38
    ArcanaGeneratorInfo,        0xCa59B3373F247F115D5A867CB0E2b18cAA43C96d
    EggSupplement,              0xB93181E64ea17B24a1a13dC31396CA86CE63B2c8
    SquareSupplement,           0x45BbC4fABbA1883A94BE0ff4Ab02d19B778d86bd
    ContentsScopeApprover,      0x9617Ba1f8a08B75b3d9E6fF4dE3E1233440969AB
    AbsorbAuthority,            0x36fddE6a2cCF18553B18e8C6b1A5535ee3B9cED1
    AbsorbIntervalApprover,     0x2D6296a287e4211c4b6c8232Baf0e3E084f6db7F
    DrawChain,                  0x4B4DB59Fc8612D697D418CF9A6C39634E08B6589
    Persona,                    0xD513eAd11bAfeE6b2bC08436a512FF3A8AC0265E
    DrawAbilityLimitter,        0x37Ef8Fa8995c43C26AC675C3A9DF317f3ed3A476
    DrawPersonaCategoryLimitter,0xb9AA5Df1637d0cB103BA2F2D799AE878F082BBDF
    DrawQuantityLimitter,       0xF8BD4c1EEd08c48D086EB3bDeAE9eF03B05488aF
    DrawFollowerLimitter,       0xE4FDF41364930Fc4E43332E35d0F86478a0fa7D3
    DrawCountLimitter,          0xD1128FF78c7ba79B3f8E679387D6C0C53321482b
    DrawPersonaLimitter,        0xFcd33F400399f7E46dca668A4Ec36652e035c276
    Boloodline,                 0xF062Fa680057396a9c6a336139E531E0FFaBfAd6


-------------------------------------------------------------------

-------------------------
コントラクトABI
-------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    コントラクト, abi
    Egg,                         :download:`Egg.json<../file_ark1/abi/Egg.json>`
    ArcanaGeneratorInfo,         :download:`ArcanaGeneratorInfo.json<../file_ark1/abi/ArcanaGeneratorInfo.json>`
    EggSupplement,               :download:`EggSupplement.json<../file_ark1/abi/EggSupplement.json>`
    SquareSupplement,            :download:`SquareSupplement.json<../file_ark1/abi/SquareSupplement.json>`
    ContentsScopeApprover,       :download:`ContentsScopeApprover.json<../file_ark1/abi/ContentsScopeApprover.json>`
    AbsorbAuthority,             :download:`AbsorbAuthority.json<../file_ark1/abi/AbsorbAuthority.json>`
    DrawChain,                   :download:`DrawChain.json<../file_ark1/abi/DrawChainV1.json>`
    Persona,                     :download:`Persona.json<../file_ark1/abi/Persona.json>`
    DrawAbilityLimitter,         :download:`DrawAbilityLimitter.json<../file_ark1/abi/DrawAbilityLimitter.json>`
    DrawPersonaCategoryLimitter, :download:`DrawPersonaCategoryLimitter.json<../file_ark1/abi/DrawPersonaCategoryLimitter.json>`
    DrawQuantityLimitter,        :download:`DrawQuantityLimitter.json<../file_ark1/abi/DrawQuantityLimitter.json>`
    DrawFollowerLimitter,        :download:`DrawFollowerLimitter.json<../file_ark1/abi/DrawFollowerLimitter.json>`
    DrawCountLimitter,           :download:`DrawCountLimitter.json<../file_ark1/abi/DrawCountLimitter.json>`
    DrawPersonaLimitter,         :download:`DrawPersonaLimitter.json<../file_ark1/abi/DrawPersonaLimitter.json>`
    Square,                      :download:`Square.json<../file_ark1/abi/Square.json>`
    Boloodline,                  :download:`Bloodline.json<../file_ark1/abi/Bloodline.json>`


-------------------------------------------------------------------

-------------------------
インターフェース
-------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    IF, ダウンロード
    IDrawChainAuthorizer,    :download:`IDrawChainAuthorizer.sol<../file_ark1/if/IDrawChainAuthorizer.sol>`
    IAbsorbApprover,         :download:`IAbsorbApprover.sol<../file_ark1/if/IAbsorbApprover.sol>`
	IDrawChainPostProcessor, :download:`IDrawChainPostProcessor.sol<../file_ark1/if/IDrawChainPostProcessor.sol>`

-------------------------------------------------------------------

-------------------------
ライブラリ
-------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    ライブラリ, ファイル
    genSig,          :download:`genSig.js<../file_ark1/lib/genSig.js>`
    genSig.cfg.json, :download:`genSig.cfg.json<../file_ark1/lib/genSig.cfg.json>`

.. caution:: 
   使用する環境のchainIdをgenSig.cfg.jsonに設定してください。また、genSig.cfg.json は genSig.jsから参照されます。同じフォルダ内に配置してください。

-------------------------------------------------------------------


-------------------------
ANICANAポータルサイト
-------------------------

- `ANICANAポータルサイト(テスト環境) <https://staging.anicana.org/>`_

------------------------------------------------------------------------------------------

------------------------------------
ARCANA生成ページ呼び出しスクリプト
------------------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    "環境", "APIエンドポイント（base_url）"
    "Ark.one","https://staging.anicana.org/"

------------------------------------------------------------------------------------------

------------------------------------
check status
------------------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    "環境", "APIエンドポイント"
    "Ark.one","https://api-staging.anicana.org/"

------------------------------------------------------------------------------------------

------------------------------------
ログインスクリプト
------------------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    "環境", "APIエンドポイント（base_url）"
    "Ark.one","https://staging.anicana.org/"

-------------------------------------------------------------------

-------------------------
LEVICA
-------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    "環境", "APIエンドポイント（base_url）、URL"
    "ステージング", "http://levica-stg-apialb-1782828167.ap-northeast-1.elb.amazonaws.com"
    "加盟店管理画面", "http://stg.store.levica.io/login"

-----------------------------------------------------------------------------------------------------------------

-------------------------
IPFS
-------------------------

.. csv-table::
    :header-rows: 1
    :align: center

    項目, 説明
    APIサーバーエンドポイント, "https://stg.anicana-api.akqjt.io/"
    Swagger UI, "https://stg.anicana-api.akqjt.io/docs#/"
    IPFS gateway, "https://stg.anicana-api.akqjt.io/ipfs/"


