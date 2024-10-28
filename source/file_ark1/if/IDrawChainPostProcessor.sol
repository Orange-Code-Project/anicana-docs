// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

interface IDrawChainPostProcessor {
    /**
     * @notice Draw成功後の後処理を行う。
     * @param drawChainId DrawChain ID
     * @param personaId Persona ID
     * @param personaOwner Draw成功時のPersonaのOwner
     * @param processorData DrawChain.attach()時に指定するコントラクト特有のデータ
     * @return true: 景品の配布が完了した（配布日時を記録する）、false: 景品の配布は行っていない
     */
    function process(
        uint256 drawChainId,
        uint256 personaId,
        address personaOwner,
        uint256 processorData
    ) external returns(
        bool
    );
}
