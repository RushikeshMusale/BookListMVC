var dataTable;

$(document).ready(function () {
    loadDataTable();
})

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/books/getAll",
            "method": "get",
            "datatype": "json",
        },
        "columns": [
            { "data": "name" },
            { "data": "author" },
            { "data": "isbn"},
            {
                "data": "id",
                "render": function (data) {
                    debugger;
                    return `<div class="text-center">
                                <a href="/Books/Upsert?id=${data}" class="btn btn-success btn-sm text-white" style="cursor:pointer; width:20%" >
                                    Edit
                                </a>
                                &nbsp;
                                <a onClick=Delete('/Books/delete?id=${data}') class="btn btn-danger btn-sm text-white" style="cursor:pointer; width:20%" >
                                    Delete
                                </a>
                            </div>
                    `;
                }
            }
        ],
        "language": {
            "emptyTable":"no data found"
        }

    })


}

function Delete(url) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        dangerMode: true,
        buttons: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "delete",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            })
        }
    }
    )
}