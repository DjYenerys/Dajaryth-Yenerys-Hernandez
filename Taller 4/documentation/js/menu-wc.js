'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">hospital-system documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-d4542a0c0215242658a958f64a62641544df46314f250767a84b4ab9bb1ed2d7ec4eb7eb493b3cb7089b8df5194817bffae25dc0cf187ad55f39f65140b9576b"' : 'data-bs-target="#xs-controllers-links-module-AppModule-d4542a0c0215242658a958f64a62641544df46314f250767a84b4ab9bb1ed2d7ec4eb7eb493b3cb7089b8df5194817bffae25dc0cf187ad55f39f65140b9576b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-d4542a0c0215242658a958f64a62641544df46314f250767a84b4ab9bb1ed2d7ec4eb7eb493b3cb7089b8df5194817bffae25dc0cf187ad55f39f65140b9576b"' :
                                            'id="xs-controllers-links-module-AppModule-d4542a0c0215242658a958f64a62641544df46314f250767a84b4ab9bb1ed2d7ec4eb7eb493b3cb7089b8df5194817bffae25dc0cf187ad55f39f65140b9576b"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-d4542a0c0215242658a958f64a62641544df46314f250767a84b4ab9bb1ed2d7ec4eb7eb493b3cb7089b8df5194817bffae25dc0cf187ad55f39f65140b9576b"' : 'data-bs-target="#xs-injectables-links-module-AppModule-d4542a0c0215242658a958f64a62641544df46314f250767a84b4ab9bb1ed2d7ec4eb7eb493b3cb7089b8df5194817bffae25dc0cf187ad55f39f65140b9576b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-d4542a0c0215242658a958f64a62641544df46314f250767a84b4ab9bb1ed2d7ec4eb7eb493b3cb7089b8df5194817bffae25dc0cf187ad55f39f65140b9576b"' :
                                        'id="xs-injectables-links-module-AppModule-d4542a0c0215242658a958f64a62641544df46314f250767a84b4ab9bb1ed2d7ec4eb7eb493b3cb7089b8df5194817bffae25dc0cf187ad55f39f65140b9576b"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppointmentModule.html" data-type="entity-link" >AppointmentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppointmentModule-6e590751c854f736432a1c360a52926ef2423bfedafbd37ca85097f4b1fab4a0aceea260e82147a40736c33e36f3a051c13920cd1d7f7bc73a4a3bfaa5286fdf"' : 'data-bs-target="#xs-controllers-links-module-AppointmentModule-6e590751c854f736432a1c360a52926ef2423bfedafbd37ca85097f4b1fab4a0aceea260e82147a40736c33e36f3a051c13920cd1d7f7bc73a4a3bfaa5286fdf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppointmentModule-6e590751c854f736432a1c360a52926ef2423bfedafbd37ca85097f4b1fab4a0aceea260e82147a40736c33e36f3a051c13920cd1d7f7bc73a4a3bfaa5286fdf"' :
                                            'id="xs-controllers-links-module-AppointmentModule-6e590751c854f736432a1c360a52926ef2423bfedafbd37ca85097f4b1fab4a0aceea260e82147a40736c33e36f3a051c13920cd1d7f7bc73a4a3bfaa5286fdf"' }>
                                            <li class="link">
                                                <a href="controllers/AppointmentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppointmentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppointmentModule-6e590751c854f736432a1c360a52926ef2423bfedafbd37ca85097f4b1fab4a0aceea260e82147a40736c33e36f3a051c13920cd1d7f7bc73a4a3bfaa5286fdf"' : 'data-bs-target="#xs-injectables-links-module-AppointmentModule-6e590751c854f736432a1c360a52926ef2423bfedafbd37ca85097f4b1fab4a0aceea260e82147a40736c33e36f3a051c13920cd1d7f7bc73a4a3bfaa5286fdf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppointmentModule-6e590751c854f736432a1c360a52926ef2423bfedafbd37ca85097f4b1fab4a0aceea260e82147a40736c33e36f3a051c13920cd1d7f7bc73a4a3bfaa5286fdf"' :
                                        'id="xs-injectables-links-module-AppointmentModule-6e590751c854f736432a1c360a52926ef2423bfedafbd37ca85097f4b1fab4a0aceea260e82147a40736c33e36f3a051c13920cd1d7f7bc73a4a3bfaa5286fdf"' }>
                                        <li class="link">
                                            <a href="injectables/AppointmentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppointmentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' :
                                            'id="xs-controllers-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' :
                                        'id="xs-injectables-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DoctorModule.html" data-type="entity-link" >DoctorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DoctorModule-9c9749982c17537dccc33592d17a401474884cd80a10ce24daa20c13dccd2c3eeabf42428c9d2077a6c644dea18f14292f4eebc53312981dbf8aa300abd18bfc"' : 'data-bs-target="#xs-controllers-links-module-DoctorModule-9c9749982c17537dccc33592d17a401474884cd80a10ce24daa20c13dccd2c3eeabf42428c9d2077a6c644dea18f14292f4eebc53312981dbf8aa300abd18bfc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DoctorModule-9c9749982c17537dccc33592d17a401474884cd80a10ce24daa20c13dccd2c3eeabf42428c9d2077a6c644dea18f14292f4eebc53312981dbf8aa300abd18bfc"' :
                                            'id="xs-controllers-links-module-DoctorModule-9c9749982c17537dccc33592d17a401474884cd80a10ce24daa20c13dccd2c3eeabf42428c9d2077a6c644dea18f14292f4eebc53312981dbf8aa300abd18bfc"' }>
                                            <li class="link">
                                                <a href="controllers/DoctorController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DoctorController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DoctorModule-9c9749982c17537dccc33592d17a401474884cd80a10ce24daa20c13dccd2c3eeabf42428c9d2077a6c644dea18f14292f4eebc53312981dbf8aa300abd18bfc"' : 'data-bs-target="#xs-injectables-links-module-DoctorModule-9c9749982c17537dccc33592d17a401474884cd80a10ce24daa20c13dccd2c3eeabf42428c9d2077a6c644dea18f14292f4eebc53312981dbf8aa300abd18bfc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DoctorModule-9c9749982c17537dccc33592d17a401474884cd80a10ce24daa20c13dccd2c3eeabf42428c9d2077a6c644dea18f14292f4eebc53312981dbf8aa300abd18bfc"' :
                                        'id="xs-injectables-links-module-DoctorModule-9c9749982c17537dccc33592d17a401474884cd80a10ce24daa20c13dccd2c3eeabf42428c9d2077a6c644dea18f14292f4eebc53312981dbf8aa300abd18bfc"' }>
                                        <li class="link">
                                            <a href="injectables/DoctorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DoctorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InvoiceModule.html" data-type="entity-link" >InvoiceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-InvoiceModule-c50662ef7e13a64538dae8164385be9cba8d9b9a64f1ad1e8ef3f48d16b91bc450568cef785a70f56387baf3e94f44487722127024bd05433453c6b8fc32f0c6"' : 'data-bs-target="#xs-controllers-links-module-InvoiceModule-c50662ef7e13a64538dae8164385be9cba8d9b9a64f1ad1e8ef3f48d16b91bc450568cef785a70f56387baf3e94f44487722127024bd05433453c6b8fc32f0c6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InvoiceModule-c50662ef7e13a64538dae8164385be9cba8d9b9a64f1ad1e8ef3f48d16b91bc450568cef785a70f56387baf3e94f44487722127024bd05433453c6b8fc32f0c6"' :
                                            'id="xs-controllers-links-module-InvoiceModule-c50662ef7e13a64538dae8164385be9cba8d9b9a64f1ad1e8ef3f48d16b91bc450568cef785a70f56387baf3e94f44487722127024bd05433453c6b8fc32f0c6"' }>
                                            <li class="link">
                                                <a href="controllers/InvoiceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvoiceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-InvoiceModule-c50662ef7e13a64538dae8164385be9cba8d9b9a64f1ad1e8ef3f48d16b91bc450568cef785a70f56387baf3e94f44487722127024bd05433453c6b8fc32f0c6"' : 'data-bs-target="#xs-injectables-links-module-InvoiceModule-c50662ef7e13a64538dae8164385be9cba8d9b9a64f1ad1e8ef3f48d16b91bc450568cef785a70f56387baf3e94f44487722127024bd05433453c6b8fc32f0c6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InvoiceModule-c50662ef7e13a64538dae8164385be9cba8d9b9a64f1ad1e8ef3f48d16b91bc450568cef785a70f56387baf3e94f44487722127024bd05433453c6b8fc32f0c6"' :
                                        'id="xs-injectables-links-module-InvoiceModule-c50662ef7e13a64538dae8164385be9cba8d9b9a64f1ad1e8ef3f48d16b91bc450568cef785a70f56387baf3e94f44487722127024bd05433453c6b8fc32f0c6"' }>
                                        <li class="link">
                                            <a href="injectables/InvoiceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvoiceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MedicineModule.html" data-type="entity-link" >MedicineModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MedicineModule-26702b2803fa874e6a892c9693759805819d00b73cfeabd1488ac534ccd5340c70d67e026285ff003f46bc94ef08ab3423836675715a7c4c8b1ada5495fdf6f8"' : 'data-bs-target="#xs-controllers-links-module-MedicineModule-26702b2803fa874e6a892c9693759805819d00b73cfeabd1488ac534ccd5340c70d67e026285ff003f46bc94ef08ab3423836675715a7c4c8b1ada5495fdf6f8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MedicineModule-26702b2803fa874e6a892c9693759805819d00b73cfeabd1488ac534ccd5340c70d67e026285ff003f46bc94ef08ab3423836675715a7c4c8b1ada5495fdf6f8"' :
                                            'id="xs-controllers-links-module-MedicineModule-26702b2803fa874e6a892c9693759805819d00b73cfeabd1488ac534ccd5340c70d67e026285ff003f46bc94ef08ab3423836675715a7c4c8b1ada5495fdf6f8"' }>
                                            <li class="link">
                                                <a href="controllers/MedicineController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MedicineController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MedicineModule-26702b2803fa874e6a892c9693759805819d00b73cfeabd1488ac534ccd5340c70d67e026285ff003f46bc94ef08ab3423836675715a7c4c8b1ada5495fdf6f8"' : 'data-bs-target="#xs-injectables-links-module-MedicineModule-26702b2803fa874e6a892c9693759805819d00b73cfeabd1488ac534ccd5340c70d67e026285ff003f46bc94ef08ab3423836675715a7c4c8b1ada5495fdf6f8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MedicineModule-26702b2803fa874e6a892c9693759805819d00b73cfeabd1488ac534ccd5340c70d67e026285ff003f46bc94ef08ab3423836675715a7c4c8b1ada5495fdf6f8"' :
                                        'id="xs-injectables-links-module-MedicineModule-26702b2803fa874e6a892c9693759805819d00b73cfeabd1488ac534ccd5340c70d67e026285ff003f46bc94ef08ab3423836675715a7c4c8b1ada5495fdf6f8"' }>
                                        <li class="link">
                                            <a href="injectables/MedicineService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MedicineService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OfficeModule.html" data-type="entity-link" >OfficeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OfficeModule-51a81333d3d89a0cbe76903687e56d0bdc50cc87bb5f9fdb909deb2ad3fa5950ce7a9b4354e31d2f6acd06d8afd6e7a99728c799c3eb307056527fa29f67ae69"' : 'data-bs-target="#xs-controllers-links-module-OfficeModule-51a81333d3d89a0cbe76903687e56d0bdc50cc87bb5f9fdb909deb2ad3fa5950ce7a9b4354e31d2f6acd06d8afd6e7a99728c799c3eb307056527fa29f67ae69"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OfficeModule-51a81333d3d89a0cbe76903687e56d0bdc50cc87bb5f9fdb909deb2ad3fa5950ce7a9b4354e31d2f6acd06d8afd6e7a99728c799c3eb307056527fa29f67ae69"' :
                                            'id="xs-controllers-links-module-OfficeModule-51a81333d3d89a0cbe76903687e56d0bdc50cc87bb5f9fdb909deb2ad3fa5950ce7a9b4354e31d2f6acd06d8afd6e7a99728c799c3eb307056527fa29f67ae69"' }>
                                            <li class="link">
                                                <a href="controllers/OfficeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfficeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OfficeModule-51a81333d3d89a0cbe76903687e56d0bdc50cc87bb5f9fdb909deb2ad3fa5950ce7a9b4354e31d2f6acd06d8afd6e7a99728c799c3eb307056527fa29f67ae69"' : 'data-bs-target="#xs-injectables-links-module-OfficeModule-51a81333d3d89a0cbe76903687e56d0bdc50cc87bb5f9fdb909deb2ad3fa5950ce7a9b4354e31d2f6acd06d8afd6e7a99728c799c3eb307056527fa29f67ae69"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OfficeModule-51a81333d3d89a0cbe76903687e56d0bdc50cc87bb5f9fdb909deb2ad3fa5950ce7a9b4354e31d2f6acd06d8afd6e7a99728c799c3eb307056527fa29f67ae69"' :
                                        'id="xs-injectables-links-module-OfficeModule-51a81333d3d89a0cbe76903687e56d0bdc50cc87bb5f9fdb909deb2ad3fa5950ce7a9b4354e31d2f6acd06d8afd6e7a99728c799c3eb307056527fa29f67ae69"' }>
                                        <li class="link">
                                            <a href="injectables/OfficeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfficeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PatientModule.html" data-type="entity-link" >PatientModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PatientModule-8fe1ce4ca37ba7364753f1c6bfbc2afc49a1ed80544701faab52bac66e6293b61af640fb7c0476f2fbbb90edbad49a8a9ec16c8e117cf556ac3692e245da68c7"' : 'data-bs-target="#xs-controllers-links-module-PatientModule-8fe1ce4ca37ba7364753f1c6bfbc2afc49a1ed80544701faab52bac66e6293b61af640fb7c0476f2fbbb90edbad49a8a9ec16c8e117cf556ac3692e245da68c7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PatientModule-8fe1ce4ca37ba7364753f1c6bfbc2afc49a1ed80544701faab52bac66e6293b61af640fb7c0476f2fbbb90edbad49a8a9ec16c8e117cf556ac3692e245da68c7"' :
                                            'id="xs-controllers-links-module-PatientModule-8fe1ce4ca37ba7364753f1c6bfbc2afc49a1ed80544701faab52bac66e6293b61af640fb7c0476f2fbbb90edbad49a8a9ec16c8e117cf556ac3692e245da68c7"' }>
                                            <li class="link">
                                                <a href="controllers/PatientController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PatientController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PatientModule-8fe1ce4ca37ba7364753f1c6bfbc2afc49a1ed80544701faab52bac66e6293b61af640fb7c0476f2fbbb90edbad49a8a9ec16c8e117cf556ac3692e245da68c7"' : 'data-bs-target="#xs-injectables-links-module-PatientModule-8fe1ce4ca37ba7364753f1c6bfbc2afc49a1ed80544701faab52bac66e6293b61af640fb7c0476f2fbbb90edbad49a8a9ec16c8e117cf556ac3692e245da68c7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PatientModule-8fe1ce4ca37ba7364753f1c6bfbc2afc49a1ed80544701faab52bac66e6293b61af640fb7c0476f2fbbb90edbad49a8a9ec16c8e117cf556ac3692e245da68c7"' :
                                        'id="xs-injectables-links-module-PatientModule-8fe1ce4ca37ba7364753f1c6bfbc2afc49a1ed80544701faab52bac66e6293b61af640fb7c0476f2fbbb90edbad49a8a9ec16c8e117cf556ac3692e245da68c7"' }>
                                        <li class="link">
                                            <a href="injectables/PatientService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PatientService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PersonModule.html" data-type="entity-link" >PersonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PersonModule-3affcdcd73665911a5de381b637e30a4233792c2d5ccdcb3ebfa9b401ce477290194aa84d3df86a870cb2e136146bd49f9d164249dce5b469208387eb85dd825"' : 'data-bs-target="#xs-controllers-links-module-PersonModule-3affcdcd73665911a5de381b637e30a4233792c2d5ccdcb3ebfa9b401ce477290194aa84d3df86a870cb2e136146bd49f9d164249dce5b469208387eb85dd825"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PersonModule-3affcdcd73665911a5de381b637e30a4233792c2d5ccdcb3ebfa9b401ce477290194aa84d3df86a870cb2e136146bd49f9d164249dce5b469208387eb85dd825"' :
                                            'id="xs-controllers-links-module-PersonModule-3affcdcd73665911a5de381b637e30a4233792c2d5ccdcb3ebfa9b401ce477290194aa84d3df86a870cb2e136146bd49f9d164249dce5b469208387eb85dd825"' }>
                                            <li class="link">
                                                <a href="controllers/PersonController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PersonModule-3affcdcd73665911a5de381b637e30a4233792c2d5ccdcb3ebfa9b401ce477290194aa84d3df86a870cb2e136146bd49f9d164249dce5b469208387eb85dd825"' : 'data-bs-target="#xs-injectables-links-module-PersonModule-3affcdcd73665911a5de381b637e30a4233792c2d5ccdcb3ebfa9b401ce477290194aa84d3df86a870cb2e136146bd49f9d164249dce5b469208387eb85dd825"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PersonModule-3affcdcd73665911a5de381b637e30a4233792c2d5ccdcb3ebfa9b401ce477290194aa84d3df86a870cb2e136146bd49f9d164249dce5b469208387eb85dd825"' :
                                        'id="xs-injectables-links-module-PersonModule-3affcdcd73665911a5de381b637e30a4233792c2d5ccdcb3ebfa9b401ce477290194aa84d3df86a870cb2e136146bd49f9d164249dce5b469208387eb85dd825"' }>
                                        <li class="link">
                                            <a href="injectables/PersonService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrescriptionDetailModule.html" data-type="entity-link" >PrescriptionDetailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PrescriptionDetailModule-5cd4f6e6e1dd37334c344c005466056f244812b705165c730b3d77fe62b5a9507f175a36c55e52ef3bb059467e402f030fe407f487a8f22598f653d8e3a13c11"' : 'data-bs-target="#xs-controllers-links-module-PrescriptionDetailModule-5cd4f6e6e1dd37334c344c005466056f244812b705165c730b3d77fe62b5a9507f175a36c55e52ef3bb059467e402f030fe407f487a8f22598f653d8e3a13c11"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PrescriptionDetailModule-5cd4f6e6e1dd37334c344c005466056f244812b705165c730b3d77fe62b5a9507f175a36c55e52ef3bb059467e402f030fe407f487a8f22598f653d8e3a13c11"' :
                                            'id="xs-controllers-links-module-PrescriptionDetailModule-5cd4f6e6e1dd37334c344c005466056f244812b705165c730b3d77fe62b5a9507f175a36c55e52ef3bb059467e402f030fe407f487a8f22598f653d8e3a13c11"' }>
                                            <li class="link">
                                                <a href="controllers/PrescriptionDetailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrescriptionDetailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrescriptionDetailModule-5cd4f6e6e1dd37334c344c005466056f244812b705165c730b3d77fe62b5a9507f175a36c55e52ef3bb059467e402f030fe407f487a8f22598f653d8e3a13c11"' : 'data-bs-target="#xs-injectables-links-module-PrescriptionDetailModule-5cd4f6e6e1dd37334c344c005466056f244812b705165c730b3d77fe62b5a9507f175a36c55e52ef3bb059467e402f030fe407f487a8f22598f653d8e3a13c11"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrescriptionDetailModule-5cd4f6e6e1dd37334c344c005466056f244812b705165c730b3d77fe62b5a9507f175a36c55e52ef3bb059467e402f030fe407f487a8f22598f653d8e3a13c11"' :
                                        'id="xs-injectables-links-module-PrescriptionDetailModule-5cd4f6e6e1dd37334c344c005466056f244812b705165c730b3d77fe62b5a9507f175a36c55e52ef3bb059467e402f030fe407f487a8f22598f653d8e3a13c11"' }>
                                        <li class="link">
                                            <a href="injectables/PrescriptionDetailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrescriptionDetailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrescriptionModule.html" data-type="entity-link" >PrescriptionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PrescriptionModule-2f718eb1adbc9328ac9dfda60ba374d1cd2896b96556510a60877cf3994f6696b8670a8345086a60e6074c7250e152da9758857459eec9210ecd62ffe0631ba7"' : 'data-bs-target="#xs-controllers-links-module-PrescriptionModule-2f718eb1adbc9328ac9dfda60ba374d1cd2896b96556510a60877cf3994f6696b8670a8345086a60e6074c7250e152da9758857459eec9210ecd62ffe0631ba7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PrescriptionModule-2f718eb1adbc9328ac9dfda60ba374d1cd2896b96556510a60877cf3994f6696b8670a8345086a60e6074c7250e152da9758857459eec9210ecd62ffe0631ba7"' :
                                            'id="xs-controllers-links-module-PrescriptionModule-2f718eb1adbc9328ac9dfda60ba374d1cd2896b96556510a60877cf3994f6696b8670a8345086a60e6074c7250e152da9758857459eec9210ecd62ffe0631ba7"' }>
                                            <li class="link">
                                                <a href="controllers/PrescriptionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrescriptionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrescriptionModule-2f718eb1adbc9328ac9dfda60ba374d1cd2896b96556510a60877cf3994f6696b8670a8345086a60e6074c7250e152da9758857459eec9210ecd62ffe0631ba7"' : 'data-bs-target="#xs-injectables-links-module-PrescriptionModule-2f718eb1adbc9328ac9dfda60ba374d1cd2896b96556510a60877cf3994f6696b8670a8345086a60e6074c7250e152da9758857459eec9210ecd62ffe0631ba7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrescriptionModule-2f718eb1adbc9328ac9dfda60ba374d1cd2896b96556510a60877cf3994f6696b8670a8345086a60e6074c7250e152da9758857459eec9210ecd62ffe0631ba7"' :
                                        'id="xs-injectables-links-module-PrescriptionModule-2f718eb1adbc9328ac9dfda60ba374d1cd2896b96556510a60877cf3994f6696b8670a8345086a60e6074c7250e152da9758857459eec9210ecd62ffe0631ba7"' }>
                                        <li class="link">
                                            <a href="injectables/PrescriptionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrescriptionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpecialtyModule.html" data-type="entity-link" >SpecialtyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SpecialtyModule-86d6cf615c1485a316035286e2dc1f9603a3ac277f547d0c9e503fa5c310588cb0363e0e1a10836c01ae748a8e7dfcbf46d5b2ae0ed05a98b6d7e19f91556ec3"' : 'data-bs-target="#xs-controllers-links-module-SpecialtyModule-86d6cf615c1485a316035286e2dc1f9603a3ac277f547d0c9e503fa5c310588cb0363e0e1a10836c01ae748a8e7dfcbf46d5b2ae0ed05a98b6d7e19f91556ec3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SpecialtyModule-86d6cf615c1485a316035286e2dc1f9603a3ac277f547d0c9e503fa5c310588cb0363e0e1a10836c01ae748a8e7dfcbf46d5b2ae0ed05a98b6d7e19f91556ec3"' :
                                            'id="xs-controllers-links-module-SpecialtyModule-86d6cf615c1485a316035286e2dc1f9603a3ac277f547d0c9e503fa5c310588cb0363e0e1a10836c01ae748a8e7dfcbf46d5b2ae0ed05a98b6d7e19f91556ec3"' }>
                                            <li class="link">
                                                <a href="controllers/SpecialtyController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpecialtyController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppointmentController.html" data-type="entity-link" >AppointmentController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DoctorController.html" data-type="entity-link" >DoctorController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/InvoiceController.html" data-type="entity-link" >InvoiceController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MedicineController.html" data-type="entity-link" >MedicineController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OfficeController.html" data-type="entity-link" >OfficeController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PatientController.html" data-type="entity-link" >PatientController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PersonController.html" data-type="entity-link" >PersonController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PrescriptionController.html" data-type="entity-link" >PrescriptionController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PrescriptionDetailController.html" data-type="entity-link" >PrescriptionDetailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SpecialtyController.html" data-type="entity-link" >SpecialtyController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Appointment.html" data-type="entity-link" >Appointment</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Doctor.html" data-type="entity-link" >Doctor</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Invoice.html" data-type="entity-link" >Invoice</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Medicine.html" data-type="entity-link" >Medicine</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Office.html" data-type="entity-link" >Office</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Patient.html" data-type="entity-link" >Patient</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Person.html" data-type="entity-link" >Person</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Prescription.html" data-type="entity-link" >Prescription</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PrescriptionDetail.html" data-type="entity-link" >PrescriptionDetail</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Specialty.html" data-type="entity-link" >Specialty</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAppointmentDto.html" data-type="entity-link" >CreateAppointmentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthDto.html" data-type="entity-link" >CreateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDoctorDto.html" data-type="entity-link" >CreateDoctorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInvoiceDto.html" data-type="entity-link" >CreateInvoiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMedicineDto.html" data-type="entity-link" >CreateMedicineDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOfficeDto.html" data-type="entity-link" >CreateOfficeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePatientDto.html" data-type="entity-link" >CreatePatientDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePersonDto.html" data-type="entity-link" >CreatePersonDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePrescriptionDetailDto.html" data-type="entity-link" >CreatePrescriptionDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePrescriptionDto.html" data-type="entity-link" >CreatePrescriptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSpecialtyDto.html" data-type="entity-link" >CreateSpecialtyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SpecialtyService.html" data-type="entity-link" >SpecialtyService</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAppointmentDto.html" data-type="entity-link" >UpdateAppointmentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAuthDto.html" data-type="entity-link" >UpdateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDoctorDto.html" data-type="entity-link" >UpdateDoctorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateInvoiceDto.html" data-type="entity-link" >UpdateInvoiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMedicineDto.html" data-type="entity-link" >UpdateMedicineDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOfficeDto.html" data-type="entity-link" >UpdateOfficeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePatientDto.html" data-type="entity-link" >UpdatePatientDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePersonDto.html" data-type="entity-link" >UpdatePersonDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePrescriptionDetailsDto.html" data-type="entity-link" >UpdatePrescriptionDetailsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePrescriptionDto.html" data-type="entity-link" >UpdatePrescriptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSpecialtyDto.html" data-type="entity-link" >UpdateSpecialtyDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppointmentService.html" data-type="entity-link" >AppointmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DoctorService.html" data-type="entity-link" >DoctorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InvoiceService.html" data-type="entity-link" >InvoiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MedicineService.html" data-type="entity-link" >MedicineService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OfficeService.html" data-type="entity-link" >OfficeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PatientService.html" data-type="entity-link" >PatientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PersonService.html" data-type="entity-link" >PersonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrescriptionDetailService.html" data-type="entity-link" >PrescriptionDetailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrescriptionService.html" data-type="entity-link" >PrescriptionService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});