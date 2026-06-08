const table_headings = document.querySelectorAll('thead th'),
      table_rows = document.querySelectorAll('tbody tr');

for (const [index, head] of table_headings.entries()) {
    if (index  === table_headings.length) break;
    let sort_asc = false;
    head.onclick = () => {
        table_headings.forEach( head => head.classList.remove('active') );
        head.classList.add("active");

        for (const [i, head] of table_headings.entries()) {
            if (i === index) continue;
            head.classList.remove('desc');
        }

        head.classList.toggle('desc');
        sort_asc = head.classList.contains('desc') ? false : true;


        sortTable(index, sort_asc);
    }
}

function sortTable(column, sort_asc) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();
            
        return !sort_asc ? (first_row < second_row ? -1 : 1) : (first_row < second_row ? 1 : -1);
        
    }).map( sorted_row => document.querySelector('tbody').appendChild(sorted_row) );
}