
// Async anonymous function that directly executes
(async() => {
    const ret = await handleLogin(err, authResult, this.props.dispatch);

    if (this.props.location.hash) {
        this.props.authClient.parseHash(
            { hash: this.props.location.hash },
            (err, authResult) => ret
        );
    }
})()


