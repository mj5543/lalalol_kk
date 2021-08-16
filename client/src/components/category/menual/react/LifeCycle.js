import React from 'react';
import './stickyContent.css';
import Code from '../../../lib/code/PrismCode';
const LifeCycle = () => {
  const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 70px)',
    float: 'right',
    backgroundColor: '#f1f1f1',
    padding: '20px'
  }
  const code1 = `constructor(props)`;
  const code2 = `constructor(props) {
    super(props);
    // 여기서 this.setState()를 호출하면 안 됩니다!
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }`;
  const code3 = `constructor(props) {
    super(props);
    // 이렇게 하지 마세요!
    this.state = { color: props.color };
   }`;
   const code4 = `componentDidMount()`;
   const code5 = `componentDidUpdate(prevProps, prevState, snapshot)`;
   const code6 = `componentDidUpdate(prevProps) {
    // 전형적인 사용 사례 (props 비교를 잊지 마세요)
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
    }
  }`;
  const code7 = `componentWillUnmount()`;
  // const wellowHighlight = 'background-color: rgb(247,218,100);';
  const wellowHighlight = {
    backgroundColor: 'rgb(247,218,100)'
  }
  return (
    <div style={containerStyle} className="overflow-auto">
      
        <div className="bd-main">
            {/* <h2>Category2 {match.params.name}</h2> */}
          <div class="bd-toc mt-4 mb-5 my-md-0 ps-xl-3 mb-lg-5 text-muted">
          <strong class="d-block h6 my-2 pb-2 border-bottom">On this page</strong>
          <nav id="TableOfContents">
            <ul>
              <li><a href="#mounting">Mounting</a>
                <ul>
                  <li><a href="#constructor">constructor()</a></li>
                  <li><a href="#componentDidMount">componentDidMount()</a></li>
                </ul>
              </li>
              <li><a href="#updating">updating</a>
                <ul>
                  <li><a href="#componentDidUpdate">componentDidUpdate()</a></li>
                </ul>
              </li>
              <li><a href="#unmounting">unmounting</a>
                <ul>
                  <li><a href="#componentWillUnmount">componentWillUnmount()</a></li>
                </ul>
              </li>
              {/* <li><a href="#example-with-list-group">Example with list-group</a></li>
              <li><a href="#usage">Usage</a>
                <ul>
                  <li><a href="#via-data-attributes">Via data attributes</a></li>
                  <li><a href="#via-javascript">Via JavaScript</a></li>
                  <li><a href="#methods">Methods</a>
                    <ul>
                      <li><a href="#refresh">refresh</a></li>
                      <li><a href="#dispose">dispose</a></li>
                      <li><a href="#getinstance">getInstance</a></li>
                    </ul>
                  </li>
                  <li><a href="#options">Options</a></li>
                  <li><a href="#events">Events</a></li>
                </ul>
              </li> */}
            </ul>
          </nav>
        </div>

        <div className="bd-content ps-lg-4">
          <h2 id="mounting">Mounting<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#mounting"></a></h2>
          <p>컴포넌트의 인스턴스가 생성되어 DOM 상에 삽입될 때에 순서대로 호출</p>
          <ul>
            <li>constructor()</li>
            <li>getDerivedStateFromProps()</li>
            <li><code>render()</code></li>
            <li>componentDidMount()</li>
          </ul>
          <h2 id="updating">Updating<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#updating"></a></h2>
          <p>props 또는 state가 변경되면 갱신이 발생</p>
          <ul>
            <li>getDerivedStateFromProps()</li>
            <li>shouldComponentUpdate()</li>
            <li><code>render()</code></li>
            <li>getSnapshotBeforeUpdate()</li>
            <li>componentDidUpdate()</li>
          </ul>
          <h2 id="unmounting">Unmounting<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#unmounting"></a></h2>
          <p>컴포넌트가 DOM 상에서 제거될 때에 호출</p>
          <ul>
            <li>componentWillUnmount()</li>
          </ul>

          <h3 id="constructor">constructor()<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#constructor"></a></h3>
          <Code code={code1} language="javascript" />
          <p><strong>메서드를 바인딩하거나 state를 초기화하는 작업이 없다면, 해당 React 컴포넌트에는 생성자를 구현하지 않아도 됩니다.</strong></p>
          <p>React 컴포넌트의 생성자는 해당 컴포넌트가 마운트되기 전에 호출됩니다. <span style={wellowHighlight}>React.Component</span>를 상속한 컴포넌트의 생성자를 구현할 때에는 다른 구문에 앞서<span style={wellowHighlight}> super(props)</span>를 호출해야 합니다. 그렇지 않으면 <span style={wellowHighlight}>this.props</span>가 생성자 내에서 정의되지 않아 버그로 이어질 수 있습니다.</p>
          <p>React에서 생성자는 보통 아래의 두 가지 목적을 위하여 사용됩니다</p>
          <ul>
          <li>this.state에 객체를 할당하여 지역 state를 초기화</li>
          <li>인스턴스에 이벤트 처리 메서드를 바인딩</li>
          </ul>
          <p><span style={wellowHighlight}>constructor() </span>내부에서<strong> setState()를 호출하면 안 됩니다.</strong> 컴포넌트에 지역 state가 필요하다면 생성자 내에서 <span style={wellowHighlight}>this.state</span>에 초기 state 값을 할당하면 됩니다.</p>
          <Code code={code2} language="javascript" />
          <p>생성자는 <span style={wellowHighlight}>this.state</span>를 직접 할당할 수 있는 유일한 곳입니다. 그 외의 메서드에서는<span style={wellowHighlight}> this.setState()</span>를 사용해야 합니다.</p>
          <p>생성자 내에서는 부수 효과를 발생시키거나 구독 작업(subscription)을 수행하면 안 됩니다. 해당 경우에는 <span style={wellowHighlight}>componentDidMount()</span>를 대신 사용하세요.</p>
          <p></p>
          <p><strong>주의</strong></p>
          <p><strong>state에 props를 복사하면 안 됩니다! 가장 흔히 범하는 실수 중 하나입니다.</strong></p>
          <Code code={code3} language="javascript" />
          <p>이것은 불필요한 작업이며(<span style={wellowHighlight}>this.props.color</span>를 직접 사용하면 됩니다), 버그를 발생시킵니다(<span style={wellowHighlight}>color</span> props의 값이 변하더라도 state에 반영되지 않습니다).</p>
          <p></p>
          <p><strong>props의 갱신을 의도적으로 무시해야 할 때만 이와 같은 패턴을 사용하기 바랍니다.</strong> 이 경우, 해당 props의 이름을<span style={wellowHighlight}> initialColor</span> 또는 <span style={wellowHighlight}>defaultColor</span> 등으로 변경하는 편이 자연스럽습니다. 그러면 이후 필요에 따라 컴포넌트가 key를 변경하여 초기 state를 “재설정”하도록 강제할 수 있습니다.</p>
          <p></p>
          <h3 id="componentDidMount">componentDidMount()<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#componentDidMount"></a></h3>
          <Code code={code4} language="javascript" />
          <p><span style={wellowHighlight}>componentDidMount()</span>
          는 컴포넌트가 마운트된 직후, 즉 트리에 삽입된 직후에 호출됩니다. DOM 노드가 있어야 하는 초기화 작업은 이 메서드에서 이루어지면 됩니다.
          외부에서 데이터를 불러와야 한다면, 네트워크 요청을 보내기 적절한 위치입니다.</p>
          <p>이 메서드는 데이터 구독을 설정하기 좋은 위치입니다. 데이터 구독이 이루어졌다면,
          <span style={wellowHighlight}>componentWillUnmount()</span>에서 구독 해제 작업을 반드시 수행하기 바랍니다.</p>
          <p><span style={wellowHighlight}>componentDidMount()</span>에서 <strong>즉시 setState()를 호출하는 경우도</strong> 있습니다.
          이로 인하여 추가적인 렌더링이 발생하지만, 브라우저가 화면을 갱신하기 전에 이루어질 것입니다. 이 경우 <span style={wellowHighlight}>render()</span>가 두 번 호출되지만, 
          사용자는 그 중간 과정을 볼 수 없을 것입니다. 이런 사용 방식은 성능 문제로 이어지기 쉬우므로 주의가 필요합니다. 대부분의 경우, 앞의 방식을 대신하여 
          <span style={wellowHighlight}>constructor()</span> 메서드에서 초기 state를 할당할 수 있습니다.
           하지만 모달(Modal) 또는 툴팁과 같이 렌더링에 앞서 DOM 노드의 크기나 위치를 먼저 측정해야 하는 경우 이러한 방식이 필요할 수 있습니다.</p>
           <h3 id="componentDidUpdate">componentDidUpdate()<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#componentDidUpdate"></a></h3>
           <Code code={code5} language="javascript" />
           <p><span style={wellowHighlight}>componentDidUpdate()</span>는 갱신이 일어난 직후에 호출됩니다. 이 메서드는 최초 렌더링에서는 호출되지 않습니다.</p>
            <p>컴포넌트가 갱신되었을 때 DOM을 조작하기 위하여 이 메서드를 활용하면 좋습니다. 또한, 이전과 현재의 props를 비교하여 네트워크 요청을 보내는 작업도 이 메서드에서 이루어지면 됩니다 (가령, props가 변하지 않았다면 네트워크 요청을 보낼 필요가 없습니다).</p>

           <Code code={code6} language="javascript" />
           <p><strong>주의</strong></p>
          <p><span style={wellowHighlight}>componentDidUpdate()</span>는 <ins>shouldComponentUpdate()</ins>가 false를 반환하면 호출되지 않습니다.</p>
          <h3 id="componentWillUnmount">componentWillUnmount()<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#componentWillUnmount"></a></h3>
          <Code code={code7} language="javascript" />
          <p><span style={wellowHighlight}>componentWillUnmount()</span>는 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 이 메서드 내에서 타이머 제거, 네트워크 요청 취소,
          <span style={wellowHighlight}>componentDidMount()</span> 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.</p>
          <p>이제 컴포넌트는 다시 렌더링되지 않으므로, <span style={wellowHighlight}>componentWillUnmount()</span> 내에서 <strong>setState()를 호출하면 안 됩니다.</strong>
          컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.</p>

        </div>
      </div>
      </div>
    );
};

export default LifeCycle;