import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Employee } from 'src/app/demo/api/employee';
import { EmployeeService, MESSAGE_TITLE, ROUTER } from 'src/app/shared';
import { Genders } from 'src/app/shared/constants/gender';
import { Table } from 'primeng/table';
import { ToastService } from 'src/app/shared/services/toast.service';
<<<<<<< HEAD
=======
import { error } from 'console';
>>>>>>> 4b3264c ([SBFA-3] create reset password function employee)
@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss'],
    providers: [MessageService, ToastService, ConfirmationService],
})
export class EmployeeListComponent {
    genders: any[] = Genders;
    overlayVisible: boolean = false;
    isSkeleton: boolean = true;
    employee: Employee = {};
    employees: Employee[] = [];
    deleteProductsDialog: boolean = false;
    resetPassDialog: boolean = false;
    keyToast: string = 'bc';
    userNameToResetPass = '';

    constructor(
        private _employeeService: EmployeeService,
        private _messageService: MessageService,
        private _router: Router,
        private _confirmationService: ConfirmationService,
        private _toastService: ToastService
    ) {}

    ngOnInit() {
        this.onInitApi();
        this.loadSkeletonTable();
    }

    onInitApi() {
        this._employeeService.getListEmployee().subscribe({
            next: (res) => {
                if (res.data.length > 0) {
                    this.employees = res.data as Employee[];
                } else {
                    this._toastService.showError('Empty List', this.keyToast);
                }
            },
            error: (error) => {
                error.error.messages.forEach((item: string) => {
                    this._toastService.showError(item, this.keyToast);
                });
            },
        });
    }

    confirmDelete(employee: Employee) {
        if (employee.id != -1 && employee.id != undefined) {
            this.employee = { ...employee };
            this.deleteProductsDialog = true;
        }
    }

    confirmResetPass(employee: Employee) {
        if (employee.id) {
            this._employeeService.getEmployeeById(employee.id.toString()).subscribe({
                next: (res) => {
                    this.userNameToResetPass = res.userName;
                    this.employee = employee;
                    console.log(this.userNameToResetPass);
                },
                error: (error) => {
                    error.error.Messages.forEach((item: string) => {
                        this._toastService.showError(item, this.keyToast);
                    });
                },
            });
        }
        this.resetPassDialog = true;
    }

    deleteConfirmed() {
        if (this.employee.id) {
            this._employeeService.deleteEmployeeById(this.employee.id.toString()).subscribe({
                next: () => {
                    this._toastService.showSuccess(MESSAGE_TITLE.DELETE_SUCC, this.keyToast);
                    this.onInitApi();
                    this.deleteProductsDialog = false;
                    this.employee = {};
                },
                error: () => {
                    this._toastService.showError(MESSAGE_TITLE.DELETE_ERR, this.keyToast);
                },
            });
        }
    }

    resetConfirmed() {
        if (this.userNameToResetPass) {
            this._employeeService.resetPasswordEmployee(this.userNameToResetPass).subscribe({
                next: () => {
                    this._toastService.showSuccess(MESSAGE_TITLE.RESET_PASS_SUCC, this.keyToast);
                    this.resetPassDialog = false;
                    this.employee = {};
                },
                error: (error) => {
                    this._toastService.showError(MESSAGE_TITLE.RESET_PASS_SUCC, this.keyToast);
                },
            });
        }
    }

    loadSkeletonTable() {
        setTimeout(() => {
            this.isSkeleton = false;
        }, 1000);
    }

    toggle() {
        this.overlayVisible = !this.overlayVisible;
    }

    navigateToCreateEmployee() {
        this._router.navigate([ROUTER.CREATE_EMPLOYEE]);
    }

    navigateToEditEmployee(id: number) {
        this._router.navigate([ROUTER.EDIT_EMPLOYEE + id]);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
