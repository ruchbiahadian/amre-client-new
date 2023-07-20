import "./rightBar.scss";

const rightBar = () =>{
    return(
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <span>Sugessions For You</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/3277806/pexels-photo-3277806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <span>Jane Doe</span>
                        </div>
                        <div className="buttons">
                            <button>follow</button>
                            <button>dismiss</button>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/3277806/pexels-photo-3277806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <span>Jane Doe</span>
                        </div>
                        <div className="buttons">
                            <button>follow</button>
                            <button>dismiss</button>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <span>Latest Activities</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/3277806/pexels-photo-3277806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <p>
                                <span>Jane Doe </span>
                                changed their cover picture
                            </p>
                        </div>
                        <span>
                            1 minute ago
                        </span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/3277806/pexels-photo-3277806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <p>
                                <span>Jane Doe </span>
                                posted
                            </p>
                        </div>
                        <span>
                            1 minute ago
                        </span>
                    </div>                    
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/3277806/pexels-photo-3277806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <p>
                                <span>Jane Doe </span>
                                liked a post
                            </p>
                        </div>
                        <span>
                            1 minute ago
                        </span>
                    </div>                    
                </div>
                <div className="item">
                    <span>Online Friends</span>
                        <div className="user">
                            <div className="userInfo">
                                <img src="https://images.pexels.com/photos/3277806/pexels-photo-3277806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                <div className="online"/>
                                <span>Jane Doe </span>
                            </div>
                        </div>
                        <div className="user">
                            <div className="userInfo">
                                <img src="https://images.pexels.com/photos/3277806/pexels-photo-3277806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                <div className="online"/>
                                <span>Jane Doe </span>
                            </div>
                        </div>
                        <div className="user">
                            <div className="userInfo">
                                <img src="https://images.pexels.com/photos/3277806/pexels-photo-3277806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                <div className="online"/>
                                <span>Jane Doe </span>
                            </div>
                        </div>
                        <div className="user">
                            <div className="userInfo">
                                <img src="https://images.pexels.com/photos/3277806/pexels-photo-3277806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                <div className="online"/>
                                <span>Jane Doe </span>
                            </div>
                        </div>
                        <div className="user">
                            <div className="userInfo">
                                <img src="https://images.pexels.com/photos/3277806/pexels-photo-3277806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                <div className="online"/>
                                <span>Jane Doe </span>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default rightBar;