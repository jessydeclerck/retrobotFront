import {Component, OnDestroy, OnInit} from '@angular/core';
import {Jobs} from "../../shared/enums/jobs.enum";
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../root-store";
import {ScriptStoreSelectors} from "../../root-store/script-store";
import {combineLatest} from "rxjs";
import {take} from "rxjs/operators";
import {DataService} from "../../shared/services/data.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.scss']
})
export class HarvestComponent implements OnInit {

  public jobs = Jobs;

  public selectedResources=[];


  public script$ = combineLatest([
    this.store.select(ScriptStoreSelectors.selectToGather),
    this.store.select(ScriptStoreSelectors.selectBankMap),
    this.store.select(ScriptStoreSelectors.selectStartMap),
    this.store.select(ScriptStoreSelectors.selectGatherPath),
    this.store.select(ScriptStoreSelectors.selectBankPath),
  ]);


  scriptForm = this.formBuilder.group({
    scriptName: ['', [Validators.required, Validators.minLength(3)]],
    characterName: ['', [Validators.required]],
  });

  constructor(private readonly store: Store<RootStoreState.State>,
              private readonly data: DataService,
            private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  useScript(formValues) {
    console.log(formValues);
    this.script$
      .pipe(take(1))
      .subscribe(([toGather, bankMap, startMap, gatherPath, bankPath]) => {
          this.data.useScript(toGather, bankMap, startMap, gatherPath, bankPath, formValues.scriptName, formValues.characterName);
      });
  }


}
