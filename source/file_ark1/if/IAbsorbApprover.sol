// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC165.sol";

/**
 * Personaが相手をabsorb可能か否かを判定するコントラクトインターフェース
 */
interface IAbsorbApprover is IERC165 {
    /**
     * @notice 対象のPersonaがabsorb可能か否かを判定する。
     * @param presetId プリセット番号（実装コントラクト内で自由に定義する）
     * @param predetor absorbする側のpersona Id
     * @param prey absorbされる側のpersona Id
     * @return true: absorb可、false: absorb不可
     */
    function approveAbsorb (
        uint256 presetId,
        uint256 predetor,
        uint256 prey
    ) external view returns (
        bool
    );
}
