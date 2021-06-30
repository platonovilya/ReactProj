import React, { Component } from 'react';




export class ByteNum extends Component {
  static displayName = ByteNum.name;

  constructor(props) {
    super(props);
    this.state = { nums: [], loading: true, byteNum: "" };
    //this.onAddNum = this.onAddNum.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onNumChange = this.onNumChange.bind(this);
  }
  
  onNumChange(e) {
      this.setState({byteNum: e.target.value});
  }
  onSubmit(e) {
      e.preventDefault();
      var num = this.state.byteNum;
      if (!num) {
          return;
      }

      var xhr = new XMLHttpRequest();
      xhr.open("post", 'bytenum', true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify({ binary: this.state.byteNum}));
      xhr.onload = function () {
          if (xhr.status === 200) {
              this.populateNumData();
            }
        }.bind(this);
      this.setState({byteNum: ""});
  }

  componentDidMount() {
    this.populateNumData();
  }


  static renderNumsTable(nums) {
    return (       
      <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Binary</th>
              <th>Dec</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {nums.map(num =>
              <tr key={num.id}>
                <td>{num.binary}</td>
                <td>{num.dec}</td>
              </tr>
            )}
          </tbody>
        </table>
    );
  }
  static Paint(){
    let table = document.getElementsByClassName('table table-striped')
    for(let row of table.rows){
      if (row.cells[2].html() < 50) {
        row.addClass('green')
      }
      else if (row.cells[2].html() > 49 && row.cells[2].html() < 100) {
        row.addClass('yellow')
      }
      else{
        row.addClass('red')
      }    
    }
  }

  render() {
    //let form = ByteNum.renderForm(this.state.byteNum)
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : ByteNum.renderNumsTable(this.state.nums);

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <p>
              <input type="text"
                     placeholder="Num"
                     value={this.state.byteNum}
                     onChange={this.onNumChange} />
          </p>
          <input type="submit" value="Сохранить" />
        </form>
        {contents}
      </div>
    );
  }

  async populateNumData() {
    var xhr = new XMLHttpRequest();
        xhr.open("get", 'bytenum', true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ nums: data, loading: false });
        }.bind(this);
        xhr.send();
  }
}
