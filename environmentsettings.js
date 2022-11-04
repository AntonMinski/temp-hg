const GlobalSettings = {
    development: {
        apiUrl: 'https://staging.haggadot.com/api/'
    },
    staging: {
        apiUrl: 'https://staging.haggadot.com/api/'
    },
    production: {
        apiUrl: 'https://staging.haggadot.com/api/'
    }
}

// export default GlobalSettings[process.env.NODE_ENV];
export default GlobalSettings;
