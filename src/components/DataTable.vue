<template>
  <div :class="[ { ['table-responsive']: true }, { ['table-dark']: $store.darkMode } ]">
    <div v-if="loading || ajaxLoading" class="table-responsive-loading">
      <div class="table-responsive-loading-spinner"></div>
      <div class="table-responsive-loading-text">Loading Data</div>
    </div>
    <div v-else class="table-responsive-inner">
      <div v-if="header" class="d-flex justify-content-between mx-2 px-3">
        <div v-if="limitable" class="">
          <div :class="['form-group', 'my-3', { 'form-dark': $store.darkMode }]">
            <label class="m-0 text-sm">
              <select
                v-model="itemsPerPage"
                class="form-control form-control-sm d-inline-block w-auto mt-1"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span class="ms-2">Entries per page</span>
            </label>
          </div>
        </div>
        <div v-if="searchable" class="">
          <div :class="['form-group', 'my-3', { 'form-dark': $store.darkMode }]">
            <input
              v-model="query"
              type="text"
              class="form-control form-control-md"
              placeholder="Cari.."
              @keyup="search(query)"
            />
          </div>
        </div>
        <div v-if="showFilters" class="col-auto ml-auto">
          Filters:
          <div class="table-filters d-inline-block">
            <div
              v-for="(option, i) in filters"
              :key="i"
              class="table-filter"
              @click="filter(option)"
            >
              <span>{{ option.title }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table
          class="table tablesorter"
          :class="{ straight: !breakWords, 'table-hover': !!onClick }"
        >
          <thead :class="{ ['thead-dark']: $store.darkMode }">
            <tr>
              <!-- Display Checkboxes If Requested -->
              <th v-if="selectable" class="text-dark text-sm font-weight-bolder">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    @change="selectAll"
                  />
                  <span class="custom-control-label"></span>
                </div>
              </th>

              <!-- Display Index If Requested -->
              <th 
                v-if="index"
                class="sortable text-dark text-sm font-weight-bolder"
                :class="{
                  sort: sortColumn === '#',
                  asc: sortColumn === '#' && asc,
                  desc: sortColumn === '#' && !asc,
                }"
                @click="sortIndex()"
              >
                #
              </th>
              <!-- Display All Parsed Headers -->
              <th
                v-for="(th, i) in tableHeaders"
                :key="i"
                class="sortable text-dark text-sm font-weight-bolder"
                :class="{
                  sort: sortColumn === th.name,
                  asc: sortColumn === th.name && asc,
                  desc: sortColumn === th.name && !asc,
                }"
                @click="sort(th.name)"
              >
                {{ th.th }}
              </th>
              <!-- Display Actions If Provided -->
              <th v-if="actions.length" class="text-dark text-sm font-weight-bolder">Actions</th>
            </tr>
          </thead>
          <tbody v-if="paginatedItems.length" :class="{ ['tbody-dark']: $store.darkMode }">
            <!-- Loop Through All Parsed and Paginated Items -->
            <tr
              v-for="(item, i) in paginatedItems"
              :key="i"
              :class="{ clickable: !!onClick }"
              class="text-sm"
            >
              <!-- Display Checkboxes If Requested -->
              <td v-if="selectable">
                <div
                  class="custom-control custom-checkbox d-flex justify-content-end"
                  @click="select(item)"
                >
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    :checked="item.selected"
                  />
                  <span class="custom-control-label"></span>
                </div>
              </td>

              <!-- Display Index If Requested -->
              <td v-if="index">{{ item.index + 1 }}</td>

              <!-- Display All Parsed Values -->
              <td
                v-for="(td, j) in item.details.filter((d) => d.show)"
                :key="j"
                class="justify-content-center"
                @click="
                  click(item.row, td.value, td.name, i),
                    columnClick(td.click, item.row, td.value, td.name, i)
                "
              >
                <!-- <component :is="i+'Component'" v-if="value.render"></component> -->
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span v-html="td.rendered != null ? td.rendered : '----'"></span>
              </td>

              <!-- Diplay Actions If Provided -->
              <td v-if="item.buttons.length">
                <!-- Loop Through All Provided Actions -->
                <button
                  v-for="(button, j) in item.buttons.filter((d) => d.show)"
                  :key="j"
                  type="button"
                  class="btn mt-3"
                  :class="`btn-${button.color} btn-${button.size || 'sm'}`"
                  :disabled="button.disabled"
                  @click="emit(button.event, item.row)"
                >
                  {{ button.text }}
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <!-- Display Empty Message If No Items Are Rendered -->
            <tr>
              <td
                align="center"
                :colspan="
                  headers.length + (actions.length ? 1 : 0) + (index ? 1 : 0)
                "
                class="text-dark text-sm"
              >
                Tidak Ada Hasil
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="footer" class="row mx-2 my-3 d-flex align-items-center">
        <div v-if="pageDetails" class="col-md-6">
          <div class="showing">
            <!-- Current Page Starting Index -->
            {{
              paginatedItems.length ? itemsPerPage * (currentPage - 1) + 1 : 0
            }}
            -
            <!-- Current Page End Index -->
            {{ itemsPerPage * (currentPage - 1) + paginatedItems.length }}
            <!-- All Items Provided -->
            of {{ renderedItems.length }}
          </div>
        </div>
        <div v-if="paginate" class="col-md-6">
          <ul
            v-if="paginateLinks.length"
            class="pagination justify-content-end"
          >
            <li v-if="pages && currentPage !== 1" class="page-item">
              <span class="page-link" @click="prev"
                ><i aria-hidden="true" class="fa fa-angle-left"></i
              ></span>
            </li>
            <li
              v-for="item in paginateLinks"
              :key="item.page"
              class="page-item"
              :class="{ active: currentPage === item.page }"
            >
              <span class="page-link" @click="paginate(item.page)">{{
                item.page
              }}</span>
            </li>
            <li v-if="pages && currentPage < pages" class="page-item">
              <span class="page-link" @click="next"
                ><i aria-hidden="true" class="fa fa-angle-right"></i
              ></span>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="row mx-2 my-3 d-flex align-items-center">
        <slot name="pagination" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */

export default {
  name: 'DataTable',
  props: {
    // =================================
    // Ajax
    // Datatables Ajax Uses Axios
    // Make Sure Axios Is Added As An NPM Dependency
    // =================================
    // Ajax URL
    url: {
      type: String,
      default: () => '',
    },
    // Whether Or Not To Use Ajax
    ajax: {
      type: Boolean,
      default: () => false,
    },
    // Table Items
    data: {
      type: Array,
      default: () => [],
    },
    // Action Buttons For Each Item
    actions: {
      type: Array,
      default: () => [],
    },
    // Columns and Appropriate Data Assigment
    columns: {
      type: Array,
      default: () => [],
    },
    filters: {
      type: Array,
      default: () => [],
    },
    // Whether or Not Items Should Be Indexed
    index: {
      type: Boolean,
      default: () => true,
    },
    // Set Loading Status
    loading: {
      type: Boolean,
      default: () => false,
    },
    // Click Events For Each Cell
    onClick: {
      type: Function,
      default: () => {},
    },
    // Whether Or Not The Table Should Be Allowed To Break Elements
    breakWords: {
      type: Boolean,
      default: () => false,
    },
    // Whether Or Not The Header Should Be Visible
    header: {
      type: Boolean,
      default: () => true,
    },
    // Whether Or Not The Footer Should Be Visible
    footer: {
      type: Boolean,
      default: () => true,
    },
    // Whether Or Not Searching Should Be Available
    searchable: {
      type: Boolean,
      default: () => true,
    },
    // Whether Or Not Page Limitation Should Be Changeable
    limitable: {
      type: Boolean,
      default: () => true,
    },
    // Whether Or Not Details Should Be Visible
    pageDetails: {
      type: Boolean,
      default: () => true,
    },
    // Whether Or Not The Results Should Be Paginatable
    paginatable: {
      type: Boolean,
      default: () => true,
    },

    // Whether Or Not Items Should Be Selctable
    selectable: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
    // Items TO Display For Each Paginated Page
    itemsPerPage: 10,
    // Current Page Number In Pagination
    currentPage: 1,
    // Current Page Items
    paginatedItems: [],
    // Sort Order
    asc: 'asc',
    // Column For Sorting
    sortColumn: null,
    // Search Query
    query: '',
    // Table Headers
    headers: [],
    // Mapped Data
    items: [],
    // Mapped Action Buttons
    buttons: [],
    // Loading State For Ajax Requests
    ajaxLoading: false,
    // Items To Be Displayed
    renderedItems: [],
    // Selected Items
    selected: [],
  }),
  computed: {
    // Total Number Of Pages For Pagination
    pages() {
      if (this.renderedItems.length > this.itemsPerPage) {
        return Math.ceil(this.renderedItems.length / this.itemsPerPage);
      }
      return 0;
    },
    // Array Of Links With Page Number For Pagination
    paginateLinks() {
      const links = [];
      const center = Math.round(this.pages / 2) - 1;
      for (let i = 0; i < this.pages; i += 1) {
        if (this.pages > 6) {
          const difference = this.currentPage - i;
          // around the current page
          if (!(difference < 0) && !(difference > 2)) {
            // around the center
          } else if (i === center) {
            // at the start or end
          } else if (this.pages - i <= 2 || i <= 1) {
            // everywhere else
          } else {
            continue;
          }
        }
        links.push({ page: i + 1 });
      }
      return links;
    },
    tableHeaders() {
      return this.headers.filter((u) => u.show);
    },
    showFilters() {
      return Object.keys(this.filters).length > 0;
    },
  },
  watch: {
    currentPage(newValue) {
      this.paginatedItems = this.renderedItems.slice(
        this.itemsPerPage * (newValue - 1),
        this.itemsPerPage * newValue,
      );
    },
    itemsPerPage(newValue) {
      this.currentPage = 1;
      this.paginatedItems = this.renderedItems.slice(
        newValue * (this.currentPage - 1),
        newValue * this.currentPage,
      );
    },
    items(newValue) {
      this.getHeaders();

      this.renderedItems = this.mapItems(newValue);

      // Get All Items In Current Page
      this.paginatedItems = this.renderedItems.slice(
        this.itemsPerPage * (this.currentPage - 1),
        this.itemsPerPage * this.currentPage,
      );

      this.asc = true;

      this.sortIndex();
    },
    data(newValue) {
      this.items = newValue;
    },
    renderedItems: {
      deep: true,
      handler(newValue) {
        this.paginatedItems = newValue.slice(
          this.itemsPerPage * (this.currentPage - 1),
          this.itemsPerPage * this.currentPage,
        );
      },
    },
  },
  // Lifetime Events
  async mounted() {
    // Parse Headers
    this.getHeaders();

    // Set Default Sorting To Index
    // Asc will be converted to true so order will be in ascending order
    this.asc = true;
    this.sortIndex();

    // Use Provided Data If Ajax Is Not Specified
    if (!this.ajax) {
      // Map Items From Provided Data
      this.items = this.data;
      // Get All Items In Current Page
      // this.paginatedItems = this.renderedItems.slice(this.itemsPerPage * (this.currentPage - 1), (this.itemsPerPage * this.currentPage));
    }
  },
  methods: {
    // Navigate To Provided Page
    // Arguments
    //  Page: int
    paginate(page) {
      this.currentPage = page;
    },
    // Navigate To Next Page
    next() {
      this.currentPage = this.currentPage >= this.renderedItems.length
        ? 0
        : this.currentPage + 1;
    },
    // Navigate To Previous Page
    prev() {
      this.currentPage = this.currentPage <= 0
        ? this.renderedItems.length
        : this.currentPage - 1;
    },
    // Navigate To Last Page
    end() {
      this.currentPage = this.renderedItems.length;
    },
    // Navigate To First Page
    start() {
      this.currentPage = 1;
    },
    // Search Through Items With Provided Search Query
    // Arguments
    //  Query: string
    search(query) {
      const items = this.mapItems(this.items);
      const retval = items.filter((item) => {
        let found = false;
        // Search In Mapped Data
        item.details.forEach((detail) => {
          // Cancel If Original And Processed Value Are NULL Or Undefined
          if (
            detail.value === null
            || detail.rendered === null
            || detail.value === undefined
            || detail.rendered === undefined
          ) {
            return;
          }
          // If Found In Original Value
          if (detail.value.toString().match(new RegExp(query, 'i'))) {
            found = true;
          }

          // If Found In Processed Value
          if (detail.rendered.toString().match(new RegExp(query, 'i'))) {
            found = true;
          }
        });

        // Search In Provided Data
        for (const column in item.row) {
          if (!item.row[column]) {
            continue;
          }

          if (item.row[column].toString().match(new RegExp(query, 'i'))) {
            found = true;
          }
          if (
            Object.values(item.row[column])
              .toString()
              .match(new RegExp(query, 'i'))
          ) {
            found = true;
          }
        }

        return found;
      });
      this.renderedItems = retval;

      this.sortIndex(false);
    },
    // Sort Items By Specified Column and Order
    // Arguments
    //  Column: String
    //  Order: String [asc, desc]
    sort(column) {
      this.renderedItems = this.renderedItems.sort((a, b) => {
        const detailx = a.details.find((detail) => detail.name === column);
        let x = detailx.rendered;
        x = typeof x === 'string' ? x.toLowerCase() : x;
        const detaily = b.details.find((detail) => detail.name === column);
        let y = detaily.rendered;
        y = typeof y === 'string' ? y.toLowerCase() : y;
        return x > y ? -1 : 1;
      });
      if (!this.asc && column !== this.sortColumn) {
        this.asc = true;
      } else if (this.asc === true && column === this.sortColumn) {
        this.asc = false;
      } else {
        column = '#';
        this.sortIndex();
        this.asc = !this.asc;
      }

      if (!this.asc) {
        this.renderedItems = this.renderedItems.reverse();
      }
      this.sortColumn = column;

      this.currentPage = 1;
    },

    sortIndex(asc) {
      this.renderedItems = this.renderedItems.sort((a, b) => {
        const indexA = a.index;
        const indexB = b.index;
        return indexA > indexB ? -1 : 1;
      });
      this.asc = this.sortColumn === '#' ? !this.asc : true;

      if (asc !== undefined) {
        if (!asc) {
          this.renderedItems = this.renderedItems.reverse();
        }
      } else if (!this.asc) {
        this.renderedItems = this.renderedItems.reverse();
      }

      this.sortColumn = '#';

      this.currentPage = 1;
    },

    filter(filter) {
      const filterValue = filter.value;
      const filterColumn = filter.name;

      const items = this.mapItems(this.items);
      const filtered = items.filter((item, index) => {
        const column = item.details.find(
          (value) => value.name === filterColumn,
        );
        if (!column) {
          return false;
        }
        // If Value Type Is A Custom Function
        if (filterValue.constructor.toString().match(/Function/)) {
          if (filterValue(item.row, column.value, index)) {
            return true;
          }
        } else if (
          column.value === filterValue
          || column.rendered === filterValue
        ) {
          return true;
        }
        return false;
      });

      this.renderedItems = filtered;
      this.currentPage = 1;

      this.sortIndex(false);
    },

    getHeaders() {
      this.headers = this.columns.map((item) => ({
        name: item.name,
        th: item.th,
        show: item.show !== false,
      }));
    },
    mapItems(items) {
      items = items.map((item, index) => {
        // Row Item
        const row = {
          row: item,
          details: [],
          index,
          buttons: [],
          selected: !!this.selected.find((a) => a.index === index),
        };

        // Get Provided Columns
        this.columns.forEach((column) => {
          row.details.push({
            // Item Column Name
            name: column.name,
            // Table Header Title
            th: column.th,
            // Provided Value
            value: item[column.name],
            // Decide Value Depending On Whether Render Method Is Provided
            rendered: column.render
              ? column.render(item, item[column.name], index)
              : item[column.name],
            // Origin Item Row
            // row: item,
            // Whether Or Not To Display Item
            show: column.show !== false,
            // Click Event For Column
            click: column.click,
          });
        });

        // Get Provided Actions
        this.actions.forEach((button) => {
          row.buttons.push({
            // Spread Provided Button Properties
            ...button,
            // Decide Visibility Depending On Whether Show Method Is Provided
            // Default: true
            show: button.show ? button.show(item, index) : true,
            disabled: button.disabled ? button.disabled(item, index) : false,
          });
        });

        return row;
      });
      return items;
    },
    click() {
      if (this.onClick) {
        this.onClick(...arguments);
      }
    },
    columnClick(action, row, cell, name, index) {
      if (action) {
        action(row, cell, name, index);
      }
    },
    selectAll(event) {
      if (event.target.checked) {
        this.selected = [];
        this.renderedItems.forEach((item) => {
          item.selected = true;
          this.selected.push(item);
        });
      } else {
        this.selected = [];
        this.renderedItems.forEach((item) => {
          item.selected = false;
        });
      }
    },
    select(item) {
      const index = this.selected.findIndex((a) => a.index === item.index);
      if (index > -1) {
        item.selected = false;
        this.selected.splice(index, 1);
      } else {
        item.selected = true;
        this.selected.push(item);
      }
    },

    // emit
    emit(event, data) {
      this.$emit(event, data);
    },

    // Alerts
    success(success = 'Success') {
      return success;
    },
    error(error = 'Error') {
      return error;
    },
  },
};
</script>

<style lang="sass">
@keyframes spin
  from
    transform: rotate(0deg)
  to
    transform: rotate(359deg)
.table-responsive
  // font-size: 14px
  overflow-x: auto
  border-radius: 0 0 .375rem .375rem
  &-loading
    align-items: center
    display: flex
    height: 200px
    flex-flow: column
    justify-content: center
    position: relative
    width: 100%
    &-spinner
      animation: spin 1s linear infinite
      border-radius: 999px
      border: 2px solid #007bff
      border-top-color: transparent
      content: ''
      height: 75px
      margin-bottom: 15px
      width: 75px
    &-text
      font-weight: 300
      text-transform: uppercase

  &-control
    .custom-select
      width: initial

  table
    thead
      th
        font-size: 12px
        font-weight: 500
        &.sortable
          cursor: pointer
          padding-right: 30px
          position: relative
          &:before,
          &:after
            border: 5px solid transparent
            content: ''
            display: block
            opacity: .3
            position: absolute
            right: 10px
          &:before
            border-bottom-color: currentColor
            top: 10px
          &:after
            bottom: 10px
            border-top-color: currentColor
        &.sort
          font-weight: 700
          &.asc
            &:before
              opacity: 1
          &.desc
            &:after
              opacity: 1
    tbody
      border-bottom: 1px solid #e9ecef
      tr
        &.clickable
          cursor: pointer
      td
        vertical-align: middle

    &-filters
      margin-bottom: 15px
    &-filter
      background: #fff
      border-radius: 3px
      cursor: pointer
      color: #777
      display: inline-block
      font-size: 12px
      padding: 5px 15px
      margin: 0 0 3px 3px
      &:hover
        background: #aaa
        color: #fff
      &.active
        background: #337ab7
        color: #fff
</style>
