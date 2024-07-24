const path = require('path');

module.exports = {
    entry: './src/index.js', // Your main application entry point
    output: {
        filename: 'bundle.js', // Name of the output bundle
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Rule for JS/JSX files
                exclude: /node_modules/, // Exclude node_modules
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/, // Règle pour les fichiers CSS
                use: ['style-loader', 'css-loader'] // Chargeurs appliqués dans l'ordre (de droite à gauche)
            },
            {
                test: /\.(png|jpg|gif)$/, // Règle pour les fichiers images
                use: ['file-loader']
            }
        ],
    },
};