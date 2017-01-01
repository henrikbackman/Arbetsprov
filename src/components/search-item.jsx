import React from 'react';

class SearchItem extends React.Component {
  deleteItem(id) {
    this.props.onDelete(id);
  }

  render() {
    return (
      <li className="item">
        <div className="location">
          <h2 className="city">{this.props.query.city || 'Error'}</h2>
          <div className="sub-info">{this.props.query.subInfo || 'This is not a valid Swedish city'}</div>
        </div>
        <div className="date">{this.props.date}</div>
        <button className="remove" onClick={this.deleteItem.bind(this, this.props.query.id)}></button>
      </li>
    );
  }
}

SearchItem.propTypes = {
  query: React.PropTypes.object,
  onClick: React.PropTypes.func
}

export default SearchItem;
