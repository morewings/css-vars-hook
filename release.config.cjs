/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
    branches: ['master', {name: 'beta', prerelease: true}, {name: 'alpha', prerelease: true}],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/npm',
        [
            '@semantic-release/git',
            {
                message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
            },
        ],
        '@semantic-release/github',
    ],
};
