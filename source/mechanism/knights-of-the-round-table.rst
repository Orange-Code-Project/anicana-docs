##############################
Knights of the Round Table
##############################


Validatorに対する参加承認を行う許可型ノード
============================================

Knights of the Round Table (ナイツ・オブ・ラウンドテーブル)とは、ANICANAネットワーク
に参加したいValidatorに対して、参加承認を与える権限を持つ許可型ノードのグループ。

| Validatorは、必ずKnights 1名のネットワーク参加承認を受けなくてはならない。
| (※ Initial Validatorを除く)

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

基本構成
============================================

| Knights of the Round Table にはブロックチェーンのコンセンサスへ参加可能なQueen、Knight、コンセンサスに参加しないPawnsという役職がある。
| 役職は入れ替わることがあり、その都度コンセンサスへの参加ノードも合わせて入れ替わる。
| 基本的な構成と役職の選定方法について以下に示す。


#. Knights of the Round Table は13名が定数。
#. 13名は、Queenが1名、Knightsが12名で構成される。
#. Knightsには、1～12のNoがQueenから与えられる。
#. Knightsは、Queen の任命を辞退する事ができない。
#. Validatorは、必ずKnight1名のネットワーク参加承認を受ける。承認されたValidatorは、承認したKnightのNoが紐付けられ、ブロックチェーン上に記録される。
#. Queenは、Knights12名に対する任命と剥奪の権限を持つ。
#. Queenは、Validatorから自動的に一定割合のANMを受け取る。
#. Queenの任期は2年（始期と終期を記入）。
#. Queenの任期が満了すると、次のQueenは12名のKnightの投票によって選出される。
#. ValidatorのみKnightになれる権利を持つ。 
#. Knightは、自身に割り当てられているNoが承認したValidator（パブリッシャー達）がシステムに対して支払ったGas（ANM）から、自動的に一定割合のANMを受け取れる。

