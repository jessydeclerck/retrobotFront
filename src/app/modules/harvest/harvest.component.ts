import {Component, OnDestroy, OnInit} from '@angular/core';
import {Jobs} from "../../shared/enums/jobs.enum";
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../root-store";
import {ScriptStoreSelectors} from "../../root-store/script-store";
import {combineLatest} from "rxjs";
import {take} from "rxjs/operators";
import {DataService} from "../../shared/services/data.service";

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



  constructor(private readonly store: Store<RootStoreState.State>,
              private readonly data: DataService) { }

  ngOnInit() {
  }

  useScript() {
    this.script$
      .pipe(take(1))
      .subscribe(([toGather, bankMap, startMap, gatherPath, bankPath]) => {
          this.data.useScript(toGather, bankMap, startMap, gatherPath, bankPath);
      });
  }


}
