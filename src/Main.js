import React, {useState, useEffect} from 'react';
import {Button, Input, Layout, Divider} from 'antd';
import './App.css';
import naekaracubae_main from './static/images/naekaracubae_main.jpg';

function Main() {
    const {Header, Content} = Layout;

    const axios = require('axios');
    const [count, setCount] = useState(0);
    const [inputs, setInputs] = useState({
        email: '',
        nickname: ''
    });

    // const baseUrl = 'http://localhost:8089/users';
    const baseUrl = 'http://naekaracubae.msyhu.com:8089/users';

    useEffect(() => {
        async function get() {
            const response = await axios.get(
                baseUrl + '/count'
            );
            setCount(response.data);
        }

        get();
    }, []);

    const {email, nickname} = inputs; // 비구조화 할당을 통해 값 추출

    const onChange = (e) => {
        const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });
    };

    const submitSubscribe = async () => {
        if (inputs.email === '') {
            alert('email 을 입력해 주세요');
            return;
        } else if (inputs.nickname === '') {
            alert('nickname 을 입력해 주세요');
            return;
        }

        const existsCheckResponse = await axios.get(baseUrl + '/exists/' + inputs.email
        );
        console.log(existsCheckResponse);

        if (existsCheckResponse.status !== 200 ||
            existsCheckResponse.data === true) {
            alert("이미 이 메일은 구독되어 있습니다.");
            return;
        }

        const addResponse = await axios.post(baseUrl,
            {email: inputs.email, name: inputs.nickname}
        );


        if (addResponse.status === 200) {
            alert("등록 성공!");
            setInputs({
                email: '',
                nickname: ''
            });

            window.location.reload();

            return;
        } else {
            alert("등록 실패");
            return;
        }

    }

    return (
        <div>
            <Header>
                <div className="header">
                    네,카라쿠배
                </div>
            </Header>
            <img src={naekaracubae_main} className="main-image"/>
            <Divider />
            <div className="slogan">우리가 시간이 없지,이직이 안 궁금하냐!</div>
            <Divider />
            <Layout className="content">
                <Content>
                    <div>✨지금 <font className="bold">{count}</font>명이 채용정보를 받고 있어요.</div>
                    <br/>
                    <div>네카라쿠배 개발자 채용 소식, 알고는 싶지만 하나씩 확인할 새 없이 바쁜 게 우리 탓은 아니잖아요! 월/화/수/목/금 퇴근시간마다 네카라쿠배 개발자 채용 소식을 메일로
                        받아보세요.
                    </div>
                    <br/>
                    <Input size="large" name="email" placeholder="이메일 주소" onChange={onChange} value={email}/>
                    <br/><br/>
                    <Input size="large" name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
                    <br/><br/>

                    <Button onClick={submitSubscribe} className="middle button">채용정보 무료로 구독하기</Button>

                </Content>
            </Layout>
            <br/><br/>
        </div>
    );

}

export default Main;