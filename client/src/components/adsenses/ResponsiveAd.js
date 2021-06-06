import React, { Component } from 'react'

class ResponsiveAd extends Component {

    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        setTimeout(function () { (window.adsbygoogle = window.adsbygoogle || []).push({}) }, 1000);
    }

    render() {
        return (
            <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-8918850949540829"
                data-ad-slot="9642045284"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>)
    }
}

export default ResponsiveAd