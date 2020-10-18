/* eslint-disable no-undef */
const path = require("path");
// const MyWebpackPlugin = require("./my-webpack-plugin")
const webpack = require("webpack");
const childProcess = require("child_process"); // 터미널 명령어를 실행할 수 있는 node의 모듈
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const apiMocker = require("connect-api-mocker");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
  devServer: {
    overlay: true,
    stats: "errors-only",
    before: (app) => {
      app.use(apiMocker("/api", "mocks/api"));
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          // publicPath: './dist/',
          name: "[name].[ext]?[hash]",
          limit: 20000,
        },
      },
      // 바벨 설정
      {
        test: /\.js$/,
        loader: "babel-loader",
        // node_modules 코드들은 바벨 로더가 처리하지 않도록
        exclude: /node_modules/,
      },
    ],
  },
  // 플러그인은 plugins 에 설정
  plugins: [
    // 만들어놓은 클래스 (생성자 함수)를 가져와서 new키워드와 함께 생성.
    // 클래스 객체가 생성되겠지
    // new MyWebpackPlugin()

    /*
      # BannerPlugin
        - 빌드 결과물에 배너를 달아준다
    */

    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
        Author: ${childProcess.execSync("git config user.name")}
      `,
    }),

    /*
      # DefinePlugin
        - 환경정보를 제공하는 플러그인
    */
    new webpack.DefinePlugin({
      TWO: "1+1",
      "api.domain": JSON.stringify("http://dev.api.domain.com"),
    }),

    /*
      # HtmlWebpackPlugin
        - HTML 파일 빌드하기
    */
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        title: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true, // 주석 제거
            }
          : false,
    }),

    /*
      # CleanWebpackPlugin
        - 이전 빌드 결과물들 지우기
    */
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: "[name].css" })]
      : []),
  ],
};
