const { fetch: originalFetch } = window;

window.fetch = async (...args) => {
    let [resource, config ] = args;

    console.log("fetch Interception", resource, config)
    // request interceptor here
    const response = await originalFetch(resource, config);
    // response interceptor here
    return response;
};