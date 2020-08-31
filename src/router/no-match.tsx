import React from "react";


function NoMatch() {
    window.location.href = '/'
    return <div className="yc-content" style={{ height: '100%', textAlign: 'center' }}>
        404  即将跳转登录页
    </div>
}

export default NoMatch;