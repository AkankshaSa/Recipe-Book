import { Directive, HostBinding, HostListener } from '@angular/core';
@Directive({
    selector: '[app-dropdown]'
})
export class dropdowndirective{
@HostBinding('class.open') isOpen=false;

@HostListener('click') toggleOpen(){
 this.isOpen= !this.isOpen
}
}