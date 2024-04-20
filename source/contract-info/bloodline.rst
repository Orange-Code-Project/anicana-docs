###########################
Bloodline
###########################

概要
============================================
BloodlineとはARCANAが所属する血統であり、全てのARCANAは100の血統(Bloodline)のいずれかに属する。
Bloodlineには始祖があり、始祖のShardからEgg→ARCANA→Shardの循環を経て、下記の図のように継承されている。
新たに生成されるARCANAは、生まれたEGGに使用された2種類のShardのいずれかのBloodlineをランダムに継承する。

.. image:: ../img/bloodline/bloodline.png

情報取得
============================================
Bloodline情報はBloodlineコントラクトを参照することで取得できる。
Bloodlineコントラクトは以下のインタフェースを持つ。


Bloodlineの情報を取得(Bloodline.sol)::

    // 指定したbloodlineのid、名称、所属するARCANA数を返す
    // @param bloodlineID
    // @return origin bloodlineのid
    //   nArcanas 所属するARCANA数
    //   name bloodlineの名称
    function bloodlineInfo(uint256 bloodlineID) public view returns(
  uint256 origin,
  uint256 nArcanas,
  string memory name
    )


ARCANAが属するBloodlineを取得(Bloodline.sol)::

    // getBloodline[arcanaID] でARCANAが所属するbloodlineIDを返す
    // @param arcanaID
    // @return bloodlineID
    function getBloodline (uint256 arcanaID) public view returns(uint256 bloodlineID)


特定のBloodlineに属するARCANAの一覧（既にburnされたARCANAを含む）を取得(Bloodline.sol)::

    // 指定したbloodlineIDに所属するarcanaIDの配列を返す
    // @param bloodlineID
    // @param idx 開始index
    // @param limit 取得数
    // @return uint256[] memory arcanaIDの配列
    function getBelongings(uint256 bloodlineID,uint256 idx, uint256 limit) public view returns(uint256[] memory)


Bloodlineの一覧
============================================

.. csv-table::
    :header-rows: 1
    :align: center

    "id", "名前","出展"
    "1","ゼウス (Zeus)","ギリシャ神話"
    "2","インドラ (Indra)","ヒンドゥー教"
    "3","アラー (Allah)","イスラム教"
    "4","オーディン (Odin)","北欧神話"
    "5","ヘラクレス (Heracles)","ギリシャ神話"
    "6","ヴィシュヌ (Vishnu)","ヒンドゥー教"
    "7","ヘラ (Hera)","ギリシャ神話"
    "8","ガネーシャ (Ganesha)","ヒンドゥー教"
    "9","オシリス (Osiris)","古代エジプト神話"
    "10","アポロン (Apollo)","ギリシャ神話"
    "11","ペルセポネ (Persephone)","ギリシャ神話"
    "12","アヌビス (Anubis)","古代エジプト神話"
    "13","ロキ (Loki)","北欧神話"
    "14","メデューサ (Medusa)","ギリシャ神話"
    "15","クリシュナ (Krishna)","ヒンドゥー教"
    "16","シヴァ (Shiva)","ヒンドゥー教"
    "17","アテナ (Athena)","ギリシャ神話"
    "18","ディオニュソス (Dionysus)","ギリシャ神話"
    "19","ヴァルナ (Varuna)","ヒンドゥー教"
    "20","イシス (Isis)","古代エジプト神話"
    "21","ニュート (Nut)","古代エジプト神話"
    "22","ペレ (Pele)","ハワイアン神話"
    "23","フレイヤ (Freya)","北欧神話"
    "24","バルドル (Balder)","北欧神話"
    "25","テスカトリポカ (Tezcatlipoca)","アステカ神話"
    "26","イザナミ (Izanami)","日本の神話"
    "27","マアト (Ma'at)","古代エジプト神話"
    "28","ハチマン (Hachiman)","神道"
    "29","パン (Pan)","ギリシャ神話"
    "30","マヌ (Manu)","ヒンドゥー教"
    "31","ヘパイストス (Hephaestus)","ギリシャ神話"
    "32","インタワ (Inti)","インカ神話"
    "33","ヴァユ (Vayu)","ヒンドゥー教"
    "34","グクマッツ (Gukumatz)","マヤ神話"
    "35","フリッグ (Frigg)","北欧神話"
    "36","ヘストィア (Hestia)","ギリシャ神話"
    "37","サラスワティ (Saraswati)","ヒンドゥー教"
    "38","オロクン (Olokun)","ヨルバ族の神話"
    "39","アグニ (Agni)","ヒンドゥー教"
    "40","カーン (K'an)","マヤ神話"
    "41","イザナギ (Izanagi)","日本の神話"
    "42","タウラマオム (Ta'aroa)","ポリネシア神話"
    "43","アヌ (Anu)","シュメール神話"
    "44","テュケー (Tyche)","ギリシャ神話"
    "45","ベロナ (Bellona)","ローマ神話"
    "46","イシュタル (Ishtar)","バビロニア神話"
    "47","ウトゥ (Utu)","シュメール神話"
    "48","ヘカテ (Hecate)","ギリシャ神話"
    "49","ハデス (Hades)","ギリシャ神話"
    "50","セット (Set)","古代エジプト神話"
    "51","ミトラ (Mithra)","ペルシャ神話"
    "52","アマテラス (Amaterasu)","日本の神話"
    "53","トール (Thor)","北欧神話"
    "54","エンキ (Enki)","シュメール神話"
    "55","モリガン (Morrigan)","ケルト神話"
    "56","パチャママ (Pachamama)","インカ神話"
    "57","バロン・サンディ (Baron Samedi)","ヴードゥー教"
    "58","アルテミス (Artemis)","ギリシャ神話"
    "59","ベニュ (Bennu)","古代エジプト神話"
    "60","アフロディーテ (Aphrodite)","ギリシャ神話"
    "61","ラー (Ra)","古代エジプト神話"
    "62","ブリギッド (Brigid)","ケルト神話"
    "63","ティアマト (Tiamat)","バビロニア神話"
    "64","ラーマ (Rama)","ヒンドゥー教"
    "65","スサノオ (Susanoo)","日本の神話"
    "66","クロノス (Cronus)","ギリシャ神話"
    "67","ダグダ (Dagda)","ケルト神話"
    "68","クエツァルコアトル (Quetzalcoatl)","アステカ神話"
    "69","パールヴァティ (Parvati)","ヒンドゥー教"
    "70","バステト (Bastet)","古代エジプト神話"
    "71","デメテル (Demeter)","ギリシャ神話"
    "72","フォルトゥナ (Fortuna)","ローマ神話"
    "73","ナラシンハ (Narasimha)","ヒンドゥー教"
    "74","ヤマ (Yama)","ヒンドゥー教"
    "75","セクメト (Sekhmet)","古代エジプト神話"
    "76","フォボス (Phobos)","ギリシャ神話"
    "77","ラクシュミ (Lakshmi)","ヒンドゥー教"
    "78","シルヴァヌス (Silvanus)","ローマ神話"
    "79","ブラフマー (Brahma)","ヒンドゥー教"
    "80","ネフティス (Nephthys)","古代エジプト神話"
    "81","ティル (Tyr)","北欧神話"
    "82","ツクヨミ (Tsukuyomi)","日本の神話"
    "83","ポセイドン (Poseidon)","ギリシャ神話"
    "84","ドゥルガー (Durga)","ヒンドゥー教"
    "85","フォルセティ (Forseti)","北欧神話"
    "86","エロス (Eros)","ギリシャ神話"
    "87","トート (Thoth)","古代エジプト神話"
    "88","イドゥン (Idun)","北欧神話"
    "89","カリ (Kali)","ヒンドゥー教"
    "90","ヘルメス (Hermes)","ギリシャ神話"
    "91","ヴィラコチャ (Viracocha)","インカ神話"
    "92","イナンナ (Inanna)","シュメール神話"
    "93","エンリル (Enlil)","シュメール神話"
    "94","アフラ・マズダ (Ahura Mazda)","ゾロアスター教"
    "95","ジャヌス (Janus)","ローマ神話"
    "96","ヌアダ (Nuada)","ケルト神話"
    "97","オシュン (Oshun)","ヨルバ神話"
    "98","チャク (Chaac)","マヤ神話"
    "99","ミクトランテクートリ (Mictlantecuhtli)","アステカ神話"
    "100","プロメテウス (Prometheus)","ギリシャ神話"
