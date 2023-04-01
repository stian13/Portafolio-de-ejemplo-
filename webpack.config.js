const path = require('path');//esto ara llamar el elmeento path
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// crearemos un modulo que va exportar una configuracion
module.exports = {
    //aca van las configuraciones 
    entry:'./src/index.js',//este nos sirve para indicar cual es el puto de entrada de la aplicacion 
    output:{                            //este dist puede ser cualquier otro nombre pero dist e usado por que es un estandar
        path: path.resolve(__dirname, 'dist'),//nos dira en que directorio esta el proyecto para usar
        filename:'[name].[contenthash].js',//ponemos el nombre resultante del js que se unira
         
    },//indicamos a donde vamos a enviar lo que prepare webpack 
    //Ahora vamos a aplicar las extenciones que vamos a trabajar
    resolve: {
        extensions:['.js'],
        alias : {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        } 
    },
    module: {
        rules: [
            {
                //aca conectaremos el webpack con babel
                test:/\.m?js$/, //le decimos que utilize cualquier extencion mjs o js
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader,
                'css-loader', //el logader del css
                'stylus-loader'
            ],
            },
            {
                test : /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:10000,
                        mimetype:"application/font-woff",
                        name:"[name].[contenthash].[ext]",
                        outputPath:"./assets/fonts/",
                        publicPath:"../assets/fonts/",
                        esModule: false,
                    },
                }
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            //aca se añadira las configuraciones del objeto 
            inject: true,//insertar los elementos
            template: './public/index.html',
            filename:'./index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'assets/[name].[contenthash].css'
        }), //aca agragamos el plugin de css
        new CopyPlugin({
            patterns:[
                {               
                    from: path.resolve(__dirname, "src", "assets/images"),//aca le decimos la ubicaion de los archivos que se moveran
                    to: "assets/images" //aca le indicamos a donde se moveran los archivos
                }
            ]
        }),
        new Dotenv(),
        new CleanWebpackPlugin(),
    ],
    optimization:{//optimizacion de de css
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),//optimizacion de de css
            new TerserPlugin(),//optimizacion de de js
        ]
    }
}