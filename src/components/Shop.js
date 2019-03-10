import React, {Component} from 'react';
import Products from "./Products";
import Sidebar from './Sidebar';
import { Form,
         FormGroup,
         Input,
         Button,
         Dropdown,
         DropdownToggle,
         DropdownMenu,
         DropdownItem } from 'reactstrap';
import product from './product.json';

export default class Shop extends Component{
	constructor(props) {
    super(props);

    this.state = {
      category: 'all',
      products: {},
      unfilteredProducts:{},
      sortOption: '',
      dropdownOpen: false,
      term: ''
    };

    this.setCategory = this.setCategory.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.setSort = this.setSort.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  setCategory(c) {
    if (c !== null && c !== undefined) {
      this.setState({category: c});
    }
  }

  setSort(e) {
		this.setState({sortOption: e});
	}

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleSearch(event) {
    this.setState({term: event.target.value});
    this.setState({category: "all"})
    let filteredProducts = this.state.unfilteredProducts;
    filteredProducts = filteredProducts.filter(i => i.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1 || i.category.toLowerCase().search(event.target.value.toLowerCase()) !== -1)
    this.setState({products: filteredProducts});
  }

  componentWillMount() {
    this.setState({products: product});
    this.setState({unfilteredProducts: product});
  }

  render(){
    return(
      <div >
        <div className='container'>
          <div className='row'>

            <div className='col-xs-12'>
              <Sidebar setCategory={this.setCategory} />
            </div>

            <FormGroup>
              <Form className="movetotheright">
                <Input className = "searchbar"
                       type="text" placeholder="Search for an item..."
                       onChange = {this.handleSearch}
                />
              </Form>
            </FormGroup>

            <FormGroup>
              <Button type="submit" size="lg" outline color="success">
                <span className="glyphicon glyphicon-search my-sm-0"/>
              </Button>
            </FormGroup>

            <Dropdown className = 'sortbutton' size="lg" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
              <DropdownToggle style={{backgroundColor: "white", borderColor: "grey" , color: "black"}} caret>
                  Sort By:
              </DropdownToggle>

              <DropdownMenu>
                <DropdownItem onClick={()=>{this.setSort("low");}}>
                  Price: Low to High
                </DropdownItem>

                <DropdownItem divider />

                <DropdownItem onClick={()=>{this.setSort("high");}}>
                  Price: High to Low
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <br/>
            <div className='col-xs-12'>
              <Products addToCart={this.props.addToCart} category={this.state.category} productsList={this.state.products}  sortOption={this.state.sortOption} term={this.state.term} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
