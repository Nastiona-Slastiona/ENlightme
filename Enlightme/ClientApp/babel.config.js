const presets = [
    [
        '@babel/preset-env',
        {
            useBuiltIns: 'entry',
            corejs: 3
        }
    ],
    '@babel/preset-react'
];

module.exports = { presets };