// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC165.sol";

/**
 * DrwaChainがdraw可能か否かを判定するコントラクトインターフェース
 */
interface IDrawChainAuthorizer is IERC165 {
    /**
     * @notice 対象のPersonaがdraw可能か否かを判定する。
     * @param drawChainId DrawChain ID
     * @param presetId プリセット番号（実装コントラクト内で自由に定義する）
     * @param personaId persona Id
     * @return true: draw可、false: draw不可
     */
    function authorizeDraw (
        uint256 drawChainId,
        uint256 presetId,
        uint256 personaId
    ) external view returns (
        bool
    );
}
