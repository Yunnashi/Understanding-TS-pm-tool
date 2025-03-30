const path = require('path');

module.exports = {
    // モードを指定
    mode: 'development',
    entry: './src/app.ts',
    // 出力先のファイル名と絶対パスを指定
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist',
    },
    devServer: {
        static: [
            {
                directory: path.resolve(__dirname, "dist"),
                publicPath: "/dist",
            },
            {
                directory: __dirname,
                publicPath: "/",
            },
        ],
    },
    // ソースマップを利用してデバッグを容易にする
    devtool: "eval",
    // 開発サーバーの設定
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    // import の拡張子を .ts として解決する
    resolve: {
        extensions: ['.ts', '.js'],
    },
}
